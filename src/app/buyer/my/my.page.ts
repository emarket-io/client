import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../../../sdk/user_pb';
import { Component, OnInit } from '@angular/core';
import { apiService, utilsService } from '../../providers/utils.service'

@Component({
  selector: 'app-my',
  templateUrl: './my.page.html',
  styleUrls: ['./my.page.scss'],
})
export class MyPage {
  user: User.AsObject;

  constructor(
    private events: Events,
    private router: Router) {
    this.events.subscribe('user:login', (username) => {
      this.user = utilsService.getUser();
    });
  }

  ionViewWillEnter() {
  }

  gotoPublish() {
    this.router.navigateByUrl('/publish');
  }

  login() {
    this.router.navigateByUrl('/login');
  }
}
