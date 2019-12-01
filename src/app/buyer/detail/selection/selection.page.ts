import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Order } from '../../../../sdk/order_pb';
import { Price } from '../../../../sdk/commodity_pb';
import { utilsService } from '../../../providers/utils.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.page.html',
  styleUrls: ['./selection.page.scss'],
})
export class SelectionPage {
  @Input() order: Order;
  formatRBM = utilsService.formatRMB;
  host = environment.apiUrl;

  constructor(private popoverController: PopoverController) { }

  ionViewWillEnter() {
    this.order.quantity = 1;
    this.order.price = this.order.snapshot.pricesList[0];
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

  continue() {
    this.popoverController.dismiss({ order: this.order });
  }

  close() {
    this.popoverController.dismiss();
  }
}
