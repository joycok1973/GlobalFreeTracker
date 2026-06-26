import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  mblno = '';
  statusMessage = '';
  statusType: 'success' | 'error' | '' = '';

  testCarriers: { carrier: string; blno: string }[] = [
    { carrier: 'ONE Line',              blno: 'ONEYCOKG03088800'  },
    { carrier: 'MSC',                   blno: 'MEDUXO992739'      },
    { carrier: 'OOCL',                  blno: 'OOLU2327208850'    },
    { carrier: 'Evergreen',             blno: 'EGLV103600018913'  },
    { carrier: 'CMA-CGM',               blno: 'CMDUAID0331341'    },
    { carrier: 'Maersk',                blno: 'MAEU271035183'     },
    { carrier: 'HMM',                   blno: 'HYDA20002400'      },
    { carrier: 'Hapag-Lloyd',           blno: 'HLCUBO12605ATNI7'  },
    { carrier: 'COSCO',                 blno: 'COSU6500018730'    },
    { carrier: 'Vanguard Logistics',    blno: 'VSLG321326000521'  },
    { carrier: 'Wan Hai',               blno: 'WHLC113G000608'    },
    { carrier: 'Yang Ming',             blno: 'YMJAN502064474'    },
    { carrier: 'Emirates Line',         blno: 'EMIVINDAHD219708'  },
    { carrier: 'ZIM',                   blno: 'ZIMUTUT6037472'    },
    { carrier: 'SM Line',               blno: 'SMLMSZP6C4347700'  },
    { carrier: 'HEDE Hong Kong',        blno: 'HDUJSLA26LO00044'  },
    { carrier: 'PIL',                   blno: 'PABVSHOL50301600'  },
    { carrier: 'Sea-Lead',              blno: 'SJHH3100124816'    },
    { carrier: 'Seth Shipping',         blno: 'SSPHPKL8155012'    },
  ];

  selectedCarrier: { carrier: string; blno: string } | null = null;

  onCarrierSelect(event: Event): void {
    const idx = (event.target as HTMLSelectElement).value;
    this.selectedCarrier = idx !== '' ? this.testCarriers[+idx] : null;
    if (this.selectedCarrier) this.mblno = this.selectedCarrier.blno;
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
