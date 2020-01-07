import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Commodity } from '../../../sdk/commodity_pb';
import { environment } from '../../../environments/environment';
import { apiService, utilsService } from '../../providers/utils.service';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage {
  keyword: string;
  host = environment.apiUrl;
  commodities: Commodity[];
  formatRBM = utilsService.formatRMB;
  slideOpts = {
    slidesPerView: 4,
  };

  constructor(private router: Router) {
    this.keyword = this.router.getCurrentNavigation().extras.state.keyword;
  }

  ionViewWillEnter() {
    let kw = new StringValue();
    kw.setValue(this.keyword);
    let stream = apiService.commodityClient.search(kw, apiService.metaData);
    this.commodities = [];
    stream.on('data', response => {
      // if (!this.commodities.some(item => item.id == response.id)) {
      this.commodities.push(response);
      // }
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  gotoDetail(commodity: Commodity) {
    this.router.navigateByUrl('/detail', { state: commodity });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
}
