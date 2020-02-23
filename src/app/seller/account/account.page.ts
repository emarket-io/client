import { Error } from 'grpc-web';
import { Component } from '@angular/core';
import { User } from '../../../sdk/user_pb';
import { Account } from '../../../sdk/order_pb';
import { apiService, utilsService } from '../../providers/utils.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage {
  account = new Account();
  formatRMB = utilsService.formatRMB;

  constructor() { }

  ionViewWillEnter() {
    this.account.userId = utilsService.storage.get('user', User).id;
    apiService.accountClient.total(this.account, apiService.metaData, (err: Error, response: Account) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response.toObject());
        this.account = response;
      }
    });
  }

}
