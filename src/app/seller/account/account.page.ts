import { Error } from 'grpc-web';
import { Component } from '@angular/core';
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
    this.account.userId = utilsService.getUser().id;
    apiService.accountClient.total(this.account, apiService.metaData).then(response => {
      console.log(response.toObject());
      this.account = response;
    }).catch(err => {
      console.log(err);
    });
  }

}
