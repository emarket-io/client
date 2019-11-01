import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { apiService, utilsService } from '../../providers/utils.service'

@Component({
  selector: 'app-my',
  templateUrl: './my.page.html',
  styleUrls: ['./my.page.scss'],
})
export class MyPage {
  user = utilsService.user;

  constructor(private router: Router) { }

  ionViewWillEnter() {
    this.user = utilsService.user;
  }

  gotoPublish() {
    this.router.navigateByUrl('/publish');
  }

  login() {
    this.router.navigateByUrl('/login');
  }
}
