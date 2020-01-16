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
  host = environment.apiUrl;

  constructor(private events: Events, private router: Router, ) { }

  logout() {
    utilsService.confirm('确定要退出登录？', () => {
      utilsService.setUser(null);
      this.events.publish('user:logout', '');
      this.router.navigateByUrl('/login');
    });
  }
}
