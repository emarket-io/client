import * as grpcWeb from 'grpc-web';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { User } from '../../../sdk/user_pb';
import { apiService, utilsService } from '../../providers/utils.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = new User();

  constructor(
    private events: Events,
    private router: Router) { }

  login() {
    if (!this.user.telephone) {
      utilsService.alert('请输入手机号码');
      return
    }
    apiService.userClient.login(this.user, apiService.metaData, (err: grpcWeb.Error, response: User) => {
      if (err) {
        console.log(err.code, err.message);
        utilsService.alert('手机号或密码不正确.');
      } else {
        utilsService.setUser(response);
        this.events.publish('user:login', response.name);
        this.router.navigateByUrl('/tabs/my');
      }
      //console.log(response);
    })
  }

  signup() {
    this.router.navigateByUrl('/signup');
  }

  logout() {
    utilsService.setUser(null);
    this.events.publish('user:logout', '');
    this.router.navigateByUrl('/login');
  }
}
