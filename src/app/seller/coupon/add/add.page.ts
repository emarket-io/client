import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { User } from '../../../../sdk/user_pb';
import { Coupon } from '../../../../sdk/commodity_pb';
import { Commodity } from '../../../../sdk/commodity_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { apiService, utilsService } from '../../../providers/utils.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {
  coupon = new Coupon();
  commodities: Commodity[];
  begin: string;
  end: string;

  constructor(private router: Router) { }

  ionViewWillEnter() {
    this.commodities = []
    let stream = apiService.commodityClient.list(utilsService.storage.get('user', User), apiService.metaData);
    stream.on('data', response => {
      this.commodities.push(response);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  submit() {
    if (!this.coupon.name) {
      return utilsService.alert('请输入券的名称');
    }
    this.coupon.owner = utilsService.storage.get('user', User).id;

    let tBegin = new Timestamp();
    tBegin.fromDate(new Date(this.begin));
    this.coupon.begin = tBegin;

    let tEnd = new Timestamp();
    tEnd.fromDate(new Date(this.end));
    this.coupon.end = tEnd;

    apiService.couponClient.add(this.coupon, apiService.metaData).then(response => {
      console.log(response);
      this.router.navigateByUrl('/coupon');
    }).catch(err => {
      utilsService.alert(JSON.stringify(err));
    })
  }
}
