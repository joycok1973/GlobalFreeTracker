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

  // Carriers the user can pick from (Track-Trace is the extension's internal fallback).
  readonly carriers = CARRIERS.filter(c => c.scac !== 'TRTR');

  ngOnInit(): void {
    // The extension opens this app with ?refno=… when it can't detect the carrier,
    // pre-filling the number so the user only has to pick the carrier.
    const refno = new URLSearchParams(window.location.search).get('refno');
    if (refno) this.mblno = refno.trim().toUpperCase();
  }

  // Clicking a carrier sends the number + that carrier's SCAC to the extension, which
  // opens that carrier's tracking page (no auto-detection — the user chose).
  trackWithCarrier(c: Carrier): void {
    const trackingNo = this.mblno.trim().toUpperCase();
    if (!trackingNo) {
      this.showStatus('Enter an MBL or Container number first.', 'error');
      return;
    }
    window.postMessage({ action: 'OPEN_SHIPPING_URL', bookingNo: trackingNo, scac: c.scac }, '*');
    this.showStatus(`Opening ${c.name}…`, 'success');
  }

  private showStatus(message: string, type: 'success' | 'error'): void {
    this.statusMessage = message;
    this.statusType = type;
    setTimeout(() => { this.statusMessage = ''; this.statusType = ''; }, 3500);
  }
}
