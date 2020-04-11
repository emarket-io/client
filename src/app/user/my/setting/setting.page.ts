import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { User } from '../../../../sdk/user_pb';
import { apiService, utilsService } from '../../../providers/utils.service'

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage {
  user = new User();

  constructor(
    private router: Router,
    private location: Location) { }

  ionViewWillEnter() {
    if (!utilsService.getUser()) {
      return this.router.navigateByUrl('/login');
    }
    this.user = utilsService.getUser();
  }

  select() {
    /*
    const options: CameraOptions = {
      quality: 80,
      correctOrientation: true,
      sourceType: 2,
      allowEdit: true,
      targetWidth: 150,
      targetHeight: 150,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.user.icon = base64Image;
    });*/
  }

  save() {
    apiService.userClient.update(this.user, apiService.metaData).then(user => {
      //this.user = response;
      utilsService.setUser(user);
      utilsService.events('user:login').emit(user.name);
      //this.events.publish('user:login', response.name);
      this.location.back();
    }).catch(err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  selectIcon() {
    let u = <HTMLInputElement>document.getElementById("fileBtn");
    let reader = new FileReader();
    let img = new Image();
    reader.onload = (e) => {
      img.src = reader.result.toString();
      img.onload = () => {
        let min = Math.min(img.width, img.height);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 160;
        canvas.height = 160;
        let x = img.width - img.height;
        if (x > 0) {
          context.drawImage(img, x / 2, 0, min, min, 0, 0, canvas.width, canvas.height);
        } else {
          context.drawImage(img, 0, -x / 2, min, min, 0, 0, canvas.width, canvas.height);
        }

        this.user.icon = canvas.toDataURL('image/jpg', 60);
      }
    };
    reader.readAsDataURL(u.files[0]);
  }
}
