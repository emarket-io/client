import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Coupon } from '../../../../sdk/commodity_pb';
import { apiService, utilsService } from '../../../providers/utils.service'

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {
  coupon = new Coupon();

  constructor(private router: Router) { }

  submit() {
    this.coupon.owner = utilsService.getUser().telephone;
    apiService.couponClient.add(this.coupon, apiService.metaData, (err: any, response: Coupon) => {
      if (err) {
        utilsService.alert(JSON.stringify(err));
      } else {
        console.log(response);
        this.router.navigateByUrl('/coupon');
      }
    })
  }

}
