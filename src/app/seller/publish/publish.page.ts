import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { apiService } from '../../providers/api.service'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage {

  address = apiService.currentAddress;
  constructor(
    private router: Router,
    private camera: Camera) { }

  gotoPublish() {
    this.router.navigateByUrl('/store/publish');
  }

  addMedia() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      alert(base64Image);
    }, (err) => {
      // Handle error
    });
  }
}
