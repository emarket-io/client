import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { Component } from '@angular/core';
import { User } from '../../../sdk/user_pb';
import { Message } from '../../../sdk/message_pb';
import { Commodity } from '../../../sdk/commodity_pb';
import { apiService, utilsService } from '../../providers/utils.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage {
  messages: Message[] = [];
  message = new Message();
  commodity: Commodity;
  user = utilsService.getUser();
  users = new Map<string, User>();

  constructor(
    private router: Router,
    private location: Location) {
    this.commodity = <Commodity>this.router.getCurrentNavigation().extras.state;
    this.getUserById();
  }

  ionViewWillEnter() {
    if (!utilsService.getUser()) {
      return this.router.navigateByUrl('/login');
    }
    let msg = new Message();
    msg.from = utilsService.getUser().id;
    msg.to = this.commodity.ownerId;
    let stream = apiService.messageClient.list(msg, apiService.metaData);
    stream.on('data', response => {
      if (!this.messages.some(item => item.id == response.id)) {
        this.messages.push(response);
      }
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
    stream.on('end', () => {
      document.getElementById('msg_bottom').scrollIntoView();
    });
  }

  getUserById() {
    let user = new User();
    user.id = this.commodity.ownerId;
    apiService.userClient.get(user, apiService.metaData, (err: any, response: User) => {
      if (err) {
        utilsService.alert(JSON.stringify(err));
      } else {
        this.users[this.commodity.ownerId] = response;
      }
    });
  }

  send() {
    if (!this.message.content) {
      return utilsService.alert('消息内容为空');
    }
    this.message.to = this.commodity.ownerId;
    this.message.from = utilsService.getUser().id;
    apiService.messageClient.add(this.message, apiService.metaData, (err: any, response: Message) => {
      if (err) {
        utilsService.alert(JSON.stringify(err));
      } else {
        this.message.content = '';
        this.ionViewWillEnter();
      }
    });
  }

  back() {
    this.location.back();
  }

}
