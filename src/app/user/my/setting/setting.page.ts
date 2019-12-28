import { Events } from '@ionic/angular';
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
    private events: Events,
    private router: Router,
    private location: Location) { }

  ionViewWillEnter() {
    if (!utilsService.getUser()) {
      return this.router.navigateByUrl('/login');
    }
    this.user = utilsService.getUser();
  }

  save() {
    apiService.userClient.update(this.user, apiService.metaData, (err, response) => {
      if (err) {
        utilsService.alert(JSON.stringify(err));
      } else {
        //this.user = response;
        utilsService.setUser(response);
        this.events.publish('user:login', response.name);
        this.location.back();
      }
    });
  }
}
