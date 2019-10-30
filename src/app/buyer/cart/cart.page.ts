import { Component } from '@angular/core';
import { User } from '../../../sdk/user_pb';
import { Order } from '../../../sdk/order_pb';
import { Commodity } from '../../../sdk/commodity_pb';
import { environment } from '../../../environments/environment';
import { apiService, utilsService } from '../../providers/utils.service'

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss']
})
export class CartPage {
  orders: Order[];
  formatRBM = utilsService.formatRMB;
  slideOpts = {
    slidesPerView: 5,
  };

  constructor() { }

  ionViewWillEnter() {
    this.orders = []
    let stream = apiService.orderClient.list(new User(), apiService.metaData);
    stream.on('data', response => {
      this.orders.push(response);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      alert(JSON.stringify(err));
    });
  }

  getCommodityById(id: string): Promise<Commodity> {
    var promise = new Promise<Commodity>(resolve => {
      let commodity = new Commodity();
      commodity.id = id;
      apiService.commodityClient.get(commodity, apiService.metaData, (err: any, response: Commodity) => {
        resolve(response);
      });
    })

    return promise;
  }
}
