import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { utilsService } from '../../../providers/utils.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {
  isBackCamera = true;
  lastUrl = '';

  constructor(private router: Router) {
    this.lastUrl = this.router.getCurrentNavigation().extras.state.url;
  }

  ionViewWillEnter() {
    this.prepare();
  }

  ionViewWillLeave() {

  }

  prepare() {
    var video = <HTMLMediaElement>document.querySelector('#video');
    navigator.mediaDevices.enumerateDevices().then(items => {
      let item = items[0];
      if (items.length > 1 && this.isBackCamera) {
        item = items[1];
      }
      const videoConstraints = { deviceId: { exact: item.deviceId } };
      navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false }).then(stream => {
        video.srcObject = stream;
        video.play();
      }).catch(err => {
        //alert('a' + JSON.stringify(err));
      });
    }).catch(err => {
      //alert('b' + JSON.stringify(err));
    });
  }

  reverse() {
    this.isBackCamera = !this.isBackCamera;
    this.prepare();
  }

  take() {
    var video = <CanvasImageSource>document.querySelector('#video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    utilsService.events(this.lastUrl + 'photo').emit(canvas.toDataURL('image/jpg'));
    canvas.toBlob(cb => {
      utilsService.events(this.lastUrl + 'blob').emit(cb);
    })
    this.router.navigateByUrl(this.lastUrl);
  }

}
