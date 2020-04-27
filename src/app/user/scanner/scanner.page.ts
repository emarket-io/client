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

  constructor() { }

  ionViewWillEnter() {
    this.codeReader.decodeOnceFromVideoDevice(undefined, 'qr-video')
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

  ionViewWillLeave() {
    this.codeReader.reset();
  }

}
