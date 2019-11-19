import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { User } from '../../../sdk/user_pb';
import { Order } from '../../../sdk/order_pb';
import { environment } from '../../../environments/environment';
import { apiService, utilsService } from '../../providers/utils.service';

@Component({
  selector: 'app-order',
  templateUrl: 'order.page.html',
  styleUrls: ['order.page.scss']
})
export class OrderPage {
  orders: Order[];
  host = environment.apiUrl;
  formatRBM = utilsService.formatRMB;
  slideOpts = {
    slidesPerView: 5,
  };

  constructor(private router: Router) { }

  ionViewWillEnter() {
    if (!utilsService.getUser()) {
      return
    }
    this.orders = []
    let user = new User();
    user.id = utilsService.getUser().id;
    let stream = apiService.orderClient.list(user, apiService.metaData);
    stream.on('data', response => {
      this.orders.push(response);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  gotoOrderDetail(order: Order) {
    this.router.navigateByUrl('buyer_order_detail', { state: order });
  }

  delete(order: Order) {
    if (window.confirm('确认删除此订单？')) {
      apiService.orderClient.delete(order, apiService.metaData, (err: any, response: any) => {
        if (err) {
          utilsService.alert(JSON.stringify(err));
        }
      })
    }
  }
}