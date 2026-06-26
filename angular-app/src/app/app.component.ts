import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CARRIERS, Carrier } from './carriers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  mblno = '';
  statusMessage = '';
  statusType: 'success' | 'error' | '' = '';

  // Supported carriers (Track-Trace is the auto-detect fallback, not shown as a chip).
  readonly carriers = CARRIERS.filter(c => c.scac !== 'TRTR');
  private readonly trackTrace = CARRIERS.find(c => c.scac === 'TRTR')!;
  private readonly CONTAINER_RE = /^[A-Z]{3}[UJZ]\d{7}$/;

  // Sample MBL/container per carrier (click a chip to fill it).
  private samples: Record<string, string> = {
    ONEY: 'ONEYCOKG03088800', MSCU: 'MEDUXO992739',     OOLU: 'OOLU2327208850',
    EGLV: 'EGLV103600018913', CMDU: 'CMDUAID0331341',   MAEU: 'MAEU271035183',
    HDMU: 'HYDA20002400',     HLCU: 'HLCUBO12605ATNI7', COSU: 'COSU6500018730',
    WHLC: 'WHLC113G000608',   YMLU: 'YMJAN502064474',   EMIU: 'EMIVINDAHD219708',
    ZIMU: 'ZIMUTUT6037472',   SMLU: 'SMLMSZP6C4347700', HDUJ: 'HDUJSLA26LO00044',
    PABV: 'PABVSHOL50301600', SJHH: 'SJHH3100124816',   SSPH: 'SSPHPKL8155012',
    VSLG: 'VSLG321326000521',
  };

  ngOnInit(): void {
    // Optional ?refno=… in the URL pre-fills the input box (MBL or container).
    const refno = new URLSearchParams(window.location.search).get('refno');
    if (refno) this.mblno = refno.trim().toUpperCase();
  }

  // Auto-detect the carrier from the entered value — mirrors the extension's
  // classifyQuery + resolveCarrier (container map → BL fallback → Track-Trace).
  get detected(): { carrier: Carrier; type: 'Container' | 'B/L'; fallback: boolean } | null {
    const v = this.mblno.trim().toUpperCase().replace(/[\s-]/g, '');
    if (!v) return null;
    const prefix = v.substring(0, 4);
    const isContainer = this.CONTAINER_RE.test(v);
    const type: 'Container' | 'B/L' = isContainer ? 'Container' : 'B/L';
    const byMbl = this.carriers.find(c => c.prefixes.includes(prefix));
    const byCont = this.carriers.find(c => c.containerPrefixes.includes(prefix)) ?? byMbl;
    const carrier = isContainer ? byCont : byMbl;
    return carrier
      ? { carrier, type, fallback: false }
      : { carrier: this.trackTrace, type, fallback: true };
  }

  fillSample(c: Carrier): void {
    this.mblno = this.samples[c.scac] ?? '';
  }

  openInExtension(): void {
    const trackingNo = this.mblno.trim().toUpperCase();
    if (!trackingNo) {
      this.showStatus('Please enter an MBL or Container number.', 'error');
      return;
    }
    // Pass the number as-is — the extension classifies MBL vs container, identifies the
    // carrier, and opens the correct tracking URL.
    window.postMessage({ action: 'OPEN_SHIPPING_URL', bookingNo: trackingNo }, '*');
    this.showStatus(`Tracking "${trackingNo}"…`, 'success');
  }

  private showStatus(message: string, type: 'success' | 'error'): void {
    this.statusMessage = message;
    this.statusType = type;
    setTimeout(() => { this.statusMessage = ''; this.statusType = ''; }, 3500);
  }
}
