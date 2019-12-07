import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { User } from '../../../../sdk/user_pb';
import { Message } from '../../../../sdk/message_pb';
import { Commodity } from '../../../../sdk/commodity_pb';
import { apiService, utilsService } from '../../../providers/utils.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage {
  message = new Message();
  commodity: Commodity;
  users = new Map<string, User>();

  constructor(private router: Router) {
    this.commodity = <Commodity>this.router.getCurrentNavigation().extras.state;
    this.getUserById();
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
    this.message.to = this.commodity.ownerId;
    apiService.messageClient.add(this.message, apiService.metaData, (err: any, response: Message) => {
      if (err) {
        utilsService.alert(JSON.stringify(err));
      } else {
        //this.popoverController.dismiss();
        this.message.content = '';
      }
    });
  }

}
