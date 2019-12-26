import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { utilsService } from '../../providers/utils.service'

@Component({
  selector: 'app-my',
  templateUrl: './my.page.html',
  styleUrls: ['./my.page.scss'],
})
export class MyPage {
  user = utilsService.getUser();

  constructor(
    private events: Events,
    private router: Router) {
    this.events.subscribe('user:login', (username) => {
      this.user = utilsService.getUser();
    });
    this.events.subscribe('user:logout', (username) => {
      this.user = utilsService.getUser();
    });
  }
}
