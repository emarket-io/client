import { Component } from '@angular/core';
import { Commodity } from '../../../sdk/commodity_pb';
import { apiService, utilsService } from '../../providers/utils.service'


@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.page.html',
  styleUrls: ['./commodity.page.scss'],
})
export class CommodityPage {
  commodities: Commodity[];

  constructor() { }

  ionViewWillEnter() {
    this.commodities = []
    let requestCommodity = new Commodity();
    requestCommodity.ownerId = utilsService.getUser().id;
    let stream = apiService.commodityClient.list(requestCommodity, apiService.metaData);
    stream.on('data', response => {
      this.commodities.push(response);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  delete(commodity: Commodity) {
    utilsService.confirm('确认删除此商品？', () => {
      apiService.commodityClient.delete(commodity, apiService.metaData, (err: any, response: any) => {
        if (err) {
          utilsService.alert(JSON.stringify(err));
        } else {
          this.ionViewWillEnter();
        }
      });
    });
  }
}
