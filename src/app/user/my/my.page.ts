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

  constructor(private router: Router) {
    utilsService.Events('user:login').subscribe((username) => {
      this.user = utilsService.getUser();
    });
    utilsService.Events('user:logout').subscribe((username) => {
      this.user = utilsService.getUser();
    });
  }
}
