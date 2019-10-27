import { Order } from '../../../sdk/order_pb';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { apiService, utilsService } from '../../providers/utils.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  constructor() { }

  ngOnInit() {
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
