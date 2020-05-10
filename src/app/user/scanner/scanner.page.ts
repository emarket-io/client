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
  torch = false;

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
    this.torch = !this.torch;
    if (!this.torch) {
      return location.href = 'https://iyou.city/scanner';
    }
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
      }
    }).then((stream) => {
      const video = document.querySelector('video');
      video.srcObject = stream;
      // get the active track of the stream
      const track = stream.getVideoTracks()[0];

      video.addEventListener('loadedmetadata', (e) => {
        window.setTimeout(() => (
          onCapabilitiesReady(track.getCapabilities())
        ), 500);
      });

      function onCapabilitiesReady(capabilities) {
        if (capabilities.torch) {
          track.applyConstraints({
            // @ts-ignore
            advanced: [{ torch: true }]
          }).catch(e => console.log(e));
        }
      }

    }).catch(err => console.error('getUserMedia() failed: ', err));
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
