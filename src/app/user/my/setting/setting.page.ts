//import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { User } from '../../../../sdk/user_pb';
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { apiService, utilsService } from '../../../providers/utils.service'

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage {
  user = new User();

  constructor(
    //private events: Events,
    private router: Router,
    //private camera: Camera,
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
    apiService.userClient.update(this.user, apiService.metaData, (err, response) => {
      if (err) {
        utilsService.alert(JSON.stringify(err));
      } else {
        //this.user = response;
        utilsService.setUser(response);
        utilsService.events('user:login').emit(response.name);
        //this.events.publish('user:login', response.name);
        this.location.back();
      }
    });
  }
}
