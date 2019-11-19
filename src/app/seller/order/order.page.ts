import { Component } from '@angular/core';
import { User } from '../../../sdk/user_pb';
import { Order } from '../../../sdk/order_pb';
import { environment } from '../../../environments/environment';
import { apiService, utilsService } from '../../providers/utils.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage {
  orders: Order[];
  host = environment.apiUrl;
  formatRBM = utilsService.formatRMB;

  constructor() { }

  ionViewWillEnter() {
    this.orders = []
    let user = new User();
    if (!utilsService.isAdmin()) {
      user.id = utilsService.getUser().id;
    }
    let stream = apiService.orderClient.list(user, apiService.metaData);
    stream.on('data', response => {
      this.orders.push(response);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
  }
}
