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
    apiService.userClient.get(utilsService.getUser(), apiService.metaData).then(user => {
      this.shop = user.shopsList[0] ? user.shopsList[0] : this.shop;
    }).catch(err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  save() {
    if (!utilsService.check(this.shop.name)) {
      return utilsService.alert('店铺名含有不合规内容，请检查');
    }
    let user = utilsService.getUser();
    user.shopsList[0] = this.shop;
    apiService.userClient.update(user, apiService.metaData).then(user => {
      this.location.back();
    }).catch(err => {
      utilsService.alert(JSON.stringify(err));
    });
  }
}
