import * as grpcWeb from 'grpc-web';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }

  login() {
    this.router.navigateByUrl('/login');
  }

  signup() {
    if (!this.user.telephone) {
      utilsService.alert('请输入电话！');
      return
    }

    apiService.userClient.add(this.user, apiService.metaData, (err: grpcWeb.Error, response: User) => {
      if (err) {
        utilsService.alert(err.message);
      } else {
        this.router.navigateByUrl('/login');
      }
      console.log(response);
    })
  }

}
