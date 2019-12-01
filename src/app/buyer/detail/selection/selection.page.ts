import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Order } from '../../../../sdk/order_pb';
import { Price } from '../../../../sdk/commodity_pb';
import { apiService, utilsService } from '../../../providers/utils.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.page.html',
  styleUrls: ['./selection.page.scss'],
})
export class SelectionPage {
  @Input() order: Order;
  formatRBM = utilsService.formatRMB;
  pendingOrders: Order[];
  host = environment.apiUrl;

  constructor(private popoverController: PopoverController) { }

  ionViewWillEnter() {
    this.order.quantity = 1;
    this.order.price = this.order.snapshot.pricesList[0];

    this.pendingOrders = []
    let requestOrder = new Order();
    requestOrder.snapshot = this.order.snapshot;
    requestOrder.status = '待成团';
    let stream = apiService.orderClient.listByStatus(requestOrder, apiService.metaData);
    stream.on('data', response => {
      this.pendingOrders.push(response);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
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

  continue(partnerUserId: string) {
    if (this.order.groupon && partnerUserId) {
      this.order.groupon.userIdsList.push(partnerUserId);
    }
    this.popoverController.dismiss({ order: this.order });
  }

  close() {
    this.popoverController.dismiss();
  }
}
