import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { User } from '../../../sdk/user_pb';
import { apiService, utilsService } from '../../providers/utils.service';

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
    apiService.userClient.get(this.user, apiService.metaData).then(user => {
      utilsService.alert('用户已存在');
    }).catch(err => {
      if (<string>err.message.includes("no rows in result")) {
        apiService.userClient.add(this.user, apiService.metaData).then(user => {
          this.location.back();
        }).catch(err => {
          utilsService.alert(err.message);
        });
      } else {
        utilsService.alert(err.message);
      }
    });
  }

  login() {
    this.router.navigateByUrl('/login', { skipLocationChange: true })
  }
}
