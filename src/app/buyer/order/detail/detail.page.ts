import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Order } from '../../../../sdk/order_pb';
import { apiService, utilsService } from '../../../providers/utils.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  order: Order;

  constructor(private router: Router) {
    this.order = <Order>this.router.getCurrentNavigation().extras.state;
  }

  ionViewWillEnter() {
    //let orderId = this.router.getCurrentNavigation().extras.state.id;
    //utilsService.alert(orderId);
  }

}
