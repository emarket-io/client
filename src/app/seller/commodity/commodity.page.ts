import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Commodity } from '../../../sdk/commodity_pb';
import { environment } from '../../../environments/environment';
import { apiService, utilsService } from '../../providers/utils.service'


@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.page.html',
  styleUrls: ['./commodity.page.scss'],
})
export class CommodityPage {
  commodities: Commodity[];
  host = environment.apiUrl;

  constructor(private router: Router) { }

  ionViewWillEnter() {
    this.commodities = []
    let stream = apiService.commodityClient.list(utilsService.getUser(), apiService.metaData);
    stream.on('data', response => {
      this.commodities.push(response);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  update(commodity: Commodity) {
    this.router.navigateByUrl('/commodity_update', { state: commodity });
  }

  offline(commodity: Commodity) {
    utilsService.confirm('确认下线此商品？', () => {
      commodity.status = "已下线";
      apiService.commodityClient.update(commodity, apiService.metaData).then(response => {
        this.ionViewWillEnter();
      }).catch(err => {
        utilsService.alert(JSON.stringify(err));
      })
    });
  }

  delete(commodity: Commodity) {
    utilsService.confirm('确认删除此商品？建议先做下线处理', () => {
      apiService.commodityClient.delete(commodity, apiService.metaData).then(response => {
        this.ionViewWillEnter();
      }).catch(err => {
        utilsService.alert(JSON.stringify(err));
      });
    });
  }
}
