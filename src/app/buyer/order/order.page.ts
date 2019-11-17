import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { User } from '../../../sdk/user_pb';
import { Order } from '../../../sdk/order_pb';
import { Commodity } from '../../../sdk/commodity_pb';
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
  idToCommodity = new Map<string, Commodity>();
  formatRBM = utilsService.formatRMB;
  slideOpts = {
    slidesPerView: 5,
  };

  constructor(private router: Router) { }

  ionViewWillEnter() {
    this.orders = []
    let stream = apiService.orderClient.list(new User(), apiService.metaData);
    stream.on('data', response => {
      this.orders.push(response);
      this.getCommodityById(response.commodityId);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      alert(JSON.stringify(err));
    });
  }

  getCommodityById(id: string) {
    let commodity = new Commodity();
    commodity.id = id;
    apiService.commodityClient.get(commodity, apiService.metaData, (err: any, response: Commodity) => {
      if (err) {
        console.log(JSON.stringify(err));
      } else {
        this.idToCommodity[id] = response;
        console.log(response.toObject())
      };
    });
  }

  gotoOrderDetail(order: Order) {
    this.router.navigateByUrl('buyer_order_detail', { state: order });
  }
}