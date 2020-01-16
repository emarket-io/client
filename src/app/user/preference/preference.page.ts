import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { utilsService } from '../../providers/utils.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.page.html',
  styleUrls: ['./preference.page.scss'],
})
export class PreferencePage {
  isLogin = false;
  host = environment.apiUrl;

  constructor(private events: Events, private router: Router, ) { }

  ionViewWillEnter() {
    if (utilsService.getUser()) {
      this.isLogin = true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    utilsService.confirm('确定要退出登录？', () => {
      utilsService.setUser(null);
      this.events.publish('user:logout', '');
      this.router.navigateByUrl('/login');
    });
  }
}
