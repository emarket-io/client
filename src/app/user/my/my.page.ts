import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { User } from '../../../sdk/user_pb';
import { utilsService } from '../../providers/utils.service';

@Component({
  selector: 'app-my',
  templateUrl: './my.page.html',
  styleUrls: ['./my.page.scss'],
})
export class MyPage {
  user = utilsService.storage.get('user',User);

  constructor(private router: Router) {
    utilsService.events('user:login').subscribe((username) => {
      this.user = utilsService.storage.get('user',User);
    });
    utilsService.events('user:logout').subscribe((username) => {
      this.user = utilsService.storage.get('user',User);
    });
  }
}
