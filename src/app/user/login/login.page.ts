import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { User } from '../../../sdk/user_pb';
import { apiService, utilsService } from '../../providers/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = new User();

  constructor(
    private router: Router,
    private location: Location) { }

  login() {
    if (!this.user.telephone) {
      return utilsService.alert('请输入手机号码');
    }
    apiService.userClient.login(this.user, apiService.metaData).then(user => {
      utilsService.setUser(user);
      utilsService.events('user:login').emit(user.name);
      //this.router.navigateByUrl('/tabs/my');
      this.location.back();
    }).catch(err => {
      console.log(err.code, err.message);
      utilsService.alert('手机号或密码不正确.');
    });
  }

  logout() {
    utilsService.setUser(null);
    utilsService.events('user:logout').emit('');
    this.router.navigateByUrl('/login');
  }

  signup() {
    this.router.navigateByUrl('/signup', { skipLocationChange: true });
  }
}
