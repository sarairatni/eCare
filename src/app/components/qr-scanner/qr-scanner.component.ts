import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [NgxScannerQrcodeModule, CommonModule ],
  template: `
    <ngx-scanner-qrcode #scanner="scanner"></ngx-scanner-qrcode>

    <!-- Display Scanned Data -->
    <p>Scanned Data: {{ scanner.data.value | json }}</p>

    <!-- Start/Stop the Scanner -->
    <button (click)="scanner.isStart ? scanner.stop() : scanner.start()">
      {{ scanner.isStart ? 'Stop' : 'Start' }}
    </button>

    <!-- Loading State -->
    <p *ngIf="scanner.isLoading">⌛ Loading...</p>
  `,
  styles: []
})
export class QrScannerComponent {
  constructor() {
    // Load the WASM file for QR code scanning
    LOAD_WASM('assets/wasm/ngx-scanner-qrcode.wasm').subscribe();
  }
}
