import { Component, OnInit } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/library';
import { apiService, utilsService } from '../../providers/utils.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  constructor() { }

  ngOnInit() { }

  ionViewWillEnter() {
    const codeReader = new BrowserMultiFormatReader();
    codeReader
      .decodeOnceFromVideoDevice(undefined, 'qr-video')
      .then(result => {
        console.log(result.getText());
        utilsService.alert(result.getText());
      })
      .catch(err => console.error(err));
  }
}
