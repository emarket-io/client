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
    // super admin
    if (utilsService.getUser().id == '15901251201' || utilsService.getUser().id == '13488762245') {
      requestCommodity.ownerId = '';
    }
    let stream = apiService.commodityClient.list(requestCommodity, apiService.metaData);
    stream.on('data', response => {
      this.commodities.push(response);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  delete(id) {
    if (window.confirm('确认要删除?')) {
      let rc = new Commodity();
      rc.id = id;
      apiService.commodityClient.delete(rc, apiService.metaData, (err: any, response: any) => {
        if (err) {
          utilsService.alert(JSON.stringify(err));
        } else {
          this.ionViewWillEnter();
        }
      });
    }
  }
}
