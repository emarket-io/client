import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { User } from '../../../sdk/user_pb';
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

  constructor(private router: Router) { }

  ionViewWillEnter() {
    if (utilsService.storage.get('user', User)) {
      this.isLogin = true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    utilsService.confirm('确定要退出登录？', () => {
      utilsService.storage.set('user', null);
      utilsService.events('user:logout').emit('');
      this.router.navigateByUrl('/login');
    });
  }

  clear() {
    navigator.serviceWorker.getRegistrations()
      .then(registrations => {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
    caches.keys().then(names => {
      for (let name of names)
        caches.delete(name);
    });
    //window.localStorage.clear();
    utilsService.toast('缓存已清除');
  }
}
