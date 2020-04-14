import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { User } from '../../../sdk/user_pb';
import { Message } from '../../../sdk/message_pb';
import { Commodity } from '../../../sdk/commodity_pb';
import { apiService, utilsService } from '../../providers/utils.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage {
  messages: Message[] = [];
  users = new Map<string, User>();

  constructor(private router: Router) { }

  ionViewWillEnter() {
    if (!utilsService.getUser()) {
      return this.router.navigateByUrl('/login');
    }
    let stream = apiService.messageClient.groupBy(utilsService.getUser(), apiService.metaData);
    stream.on('data', response => {
      if (!this.messages.some(item => item.from == response.from)) {
        this.messages.push(response);
        this.getUserById(response.from);
      }
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  getUserById(userId: string) {
    let user = new User();
    user.id = userId;
    apiService.userClient.get(user, apiService.metaData).then(user => {
      this.users[userId] = user;
    }).catch(err => {
      utilsService.alert(JSON.stringify(err));
    });
  }


  gotoSession(from: string) {
    let commodity = new Commodity();
    commodity.ownerId = from;
    this.router.navigateByUrl('/session', { state: commodity })
  }
}
