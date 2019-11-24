import { Component } from '@angular/core';
import { Coupon } from '../../../sdk/commodity_pb';
import { apiService, utilsService } from '../../providers/utils.service'

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.page.html',
  styleUrls: ['./coupon.page.scss'],
})
export class CouponPage {
  coupons: Coupon[];

  constructor() { }

  ionViewWillEnter() {
    this.coupons = []
    let stream = apiService.couponClient.list(utilsService.getUser(), apiService.metaData);
    stream.on('data', response => {
      this.coupons.push(response);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

}
