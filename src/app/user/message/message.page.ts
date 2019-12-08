import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Message } from '../../../sdk/message_pb';
import { Commodity } from '../../../sdk/commodity_pb';
import { apiService, utilsService } from '../../providers/utils.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage {
  messages: Message[];

  constructor(private router: Router) { }

  ionViewWillEnter() {
    if (!utilsService.getUser()) {
      return this.router.navigateByUrl('/login');
    }
    this.messages = [];
    let stream = apiService.messageClient.groupBy(utilsService.getUser(), apiService.metaData);
    stream.on('data', response => {
      this.messages.push(response);
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  gotoSession(from: string) {
    let commodity = new Commodity();
    commodity.ownerId = from;
    this.router.navigateByUrl('/session', { state: commodity })
  }
}
