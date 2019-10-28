import { User } from '../../../sdk/user_pb';
import { Order } from '../../../sdk/order_pb';
import { Address } from '../../../sdk/address_pb';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { apiService, utilsService } from '../../providers/utils.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage {
  address: Address;
  addresses: Address[];
  host = environment.apiUrl;
  commodity = utilsService.commodity;
  formatRBM = utilsService.formatRMB;

  constructor() { }

  ionViewWillEnter() {
    this.addresses = []
    let stream = apiService.addressClient.list((new User()), apiService.metaData);
    stream.on('data', response => {
      this.addresses.push(response);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      alert(JSON.stringify(err));
    });
  }

  preparebuy() {
    let order = new Order();
    order.commodityId = utilsService.commodity.id;
    order.userId = 'TODO';
    order.destination = null;
    order.quantity = 1;
    order.amount = 0.01;
    order.status = '待付款';
    apiService.orderClient.add(order, apiService.metaData, (err: any, response: Order) => {
      if (err) {
        utilsService.alert(JSON.stringify(err));
      } else {
        console.log(response);
      }
    });
  }
}
