import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { User, Shop } from '../../../sdk/user_pb';
import { apiService, utilsService } from '../../providers/utils.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage {
  shop = new Shop();

  constructor(private location: Location) { }

  ionViewWillEnter() {
    apiService.userClient.get(utilsService.getUser(), apiService.metaData, (err: any, response: User) => {
      if (err) {
        utilsService.alert(JSON.stringify(err));
      } else {
        this.shop = response.shopsList[0] ? response.shopsList[0] : this.shop;
      }
    });
  }

  save() {
    if (!utilsService.check(this.shop.name)) {
      return utilsService.alert('店铺名含有不合规内容，请检查');
    }
    let user = utilsService.getUser();
    user.shopsList[0] = this.shop;
    apiService.userClient.update(user, apiService.metaData, (err: any, response: User) => {
      if (err) {
        utilsService.alert(JSON.stringify(err));
      } else {
        this.location.back();
      }
    });
  }
}
