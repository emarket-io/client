import { Component } from '@angular/core';
import { utilsService } from '../../providers/utils.service';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage {
  codeReader = new BrowserMultiFormatReader();
  selectedDeviceId: string;
  deviceIds: string[] = [];

  constructor() {
    this.codeReader.listVideoInputDevices().then((videoInputDevices) => {
      videoInputDevices.forEach(item => {
        this.deviceIds.push(item.deviceId);
      })
    });
  }

  ionViewWillEnter() {
    this.scan();
  }

  ionViewWillLeave() {
    this.codeReader.reset();
  }

  toggleLight() {
    // this.qrScanner.getStatus().then((status: QRScannerStatus) => {
    //   if (status.lightEnabled) {
    //     this.qrScanner.disableLight();
    //   } else {
    //     this.qrScanner.enableLight();
    //   }
    // });
  }

  toggleCamera() {
    if (this.deviceIds.length > 1) {
      if (this.selectedDeviceId == this.deviceIds[0]) {
        this.selectedDeviceId = this.deviceIds[1];
      } else {
        this.selectedDeviceId = this.deviceIds[0];
      }
    }

    this.scan();
  }

  scan() {
    //this.codeReader.reset();
    this.codeReader.decodeOnceFromVideoDevice(this.selectedDeviceId, 'qr-video')
      .then(result => {
        console.log(result.getText());
        utilsService.alert(result.getText());
      }).catch(err => {
        console.error(err);
      }
      );
    // this.codeReader.decodeFromVideoDevice(undefined, 'qr-video', (result, err) => {
    //   if (result) {
    //     console.log(result);
    //     utilsService.alert(result.getText());
    //   }
    //   if (err && !(err instanceof NotFoundException)) {
    //     console.error(err);
    //   }
    // });
  }
}
