import { Component } from '@angular/core';
import { User } from '../../../sdk/user_pb';
import { Order } from '../../../sdk/order_pb';
import { apiService, utilsService } from '../../providers/utils.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage {
  orders: Order[];

  constructor() { }

  ionViewWillEnter() {
    this.orders = []
    let stream = apiService.orderClient.list(new User(), apiService.metaData);
    stream.on('data', response => {
      this.orders.push(response);
      //this.getCommodityById(response.commodityId);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      alert(JSON.stringify(err));
    });
  }

}
