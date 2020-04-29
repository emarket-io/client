import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { User } from '../../../../sdk/user_pb';
import { Order } from '../../../../sdk/order_pb';
import { Price } from '../../../../sdk/commodity_pb';
import { environment } from '../../../../environments/environment';
import { apiService, utilsService } from '../../../providers/utils.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.page.html',
  styleUrls: ['./selection.page.scss'],
})
export class SelectionPage {
  @Input() order: Order;
  partnerOrders: Order[];
  users = new Map<string, User>();
  host = environment.apiUrl;
  formatRBM = utilsService.formatRMB;
  slideOpts = {
    direction: "vertical",
    slidesPerView: 1,
    autoplay: {
      delay: 1500,
    },
  };

  constructor(private popoverController: PopoverController) { }

  ionViewWillEnter() {
    this.order.quantity = 1;
    this.order.price = this.order.snapshot.pricesList[0];

    if (this.order.groupon) {
      this.partnerOrders = []
      let requestOrder = new Order();
      requestOrder.snapshot = this.order.snapshot;
      requestOrder.status = '待成团';
      let stream = apiService.orderClient.listByOrder(requestOrder, apiService.metaData);
      stream.on('data', response => {
        this.partnerOrders.push(response);
        console.log(response.toObject());
        if (!this.users[response.userId]) {
          this.getUserById(response.userId);
        }
      });
      stream.on('error', err => {
        utilsService.alert(JSON.stringify(err));
      });
    }
  }

  increment() {
    this.order.quantity += 1;
  }

  decrement() {
    this.order.quantity -= 1;
  }

  select(price: Price) {
    this.order.price = price;
  }

  continue(partnerOrder?: Order) {
    if (this.partnerOrders && this.partnerOrders.length >= 1 && !partnerOrder) {
      return utilsService.confirm('当前有可参团订单，确定要单独开团？', () => {
        this.popoverController.dismiss({ order: this.order });
      }, () => { });
    }
    if (this.order.groupon && partnerOrder) {
      this.order.groupon.orderIdsList.push(partnerOrder.id);
    }
    this.popoverController.dismiss({ order: this.order });
  }

  getUserById(userId: string) {
    let user = new User();
    user.id = userId;
    apiService.userClient.get(user, apiService.metaData).then((user) => {
      this.users[userId] = user;
    }).catch((err) => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  close() {
    this.popoverController.dismiss();
  }
}
