import * as grpcWeb from 'grpc-web';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from "@angular/common";
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
    private router: Router,
    private location: Location) { }

  login() {
    if (!this.user.telephone) {
      return utilsService.alert('请输入手机号码');
    }
    apiService.userClient.login(this.user, apiService.metaData, (err: grpcWeb.Error, response: User) => {
      if (err) {
        console.log(err.code, err.message);
        utilsService.alert('手机号或密码不正确.');
      } else {
        utilsService.setUser(response);
        utilsService.events('user:login').emit(response.name);
        //this.router.navigateByUrl('/tabs/my');
        this.location.back();
      }
      //console.log(response);
    })
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
