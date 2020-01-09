import * as grpcWeb from 'grpc-web';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { Component } from '@angular/core';
import { User } from '../../../sdk/user_pb';
import { apiService, utilsService } from '../../providers/utils.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  user = new User();
  confirmPassword = '';

  constructor(
    private router: Router,
    private location: Location) { }

  signup() {
    if (!this.user.telephone) {
      return utilsService.alert('请输入手机号码');
    }

    if (this.user.password != this.confirmPassword) {
      return utilsService.alert('两次密码输入不一致');
    }

    this.user.id = this.user.telephone;
    apiService.userClient.get(this.user, apiService.metaData, (err: any, response: User) => {
      if (response) {
        utilsService.alert('用户已存在');
      } else {
        apiService.userClient.add(this.user, apiService.metaData, (err: grpcWeb.Error, response: User) => {
          if (err) {
            utilsService.alert(err.message);
          } else {
            this.location.back();
          }
          console.log(response);
        })
      }
    });
  }

  login() {
    this.router.navigateByUrl('/login', { skipLocationChange: true })
  }
}
