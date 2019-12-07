import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Order } from '../../../../sdk/order_pb';
import { utilsService } from '../../../providers/utils.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  order: Order;
  formatRBM = utilsService.formatRMB;

  constructor(private router: Router) {
    this.order = <Order>this.router.getCurrentNavigation().extras.state;
  }

}
