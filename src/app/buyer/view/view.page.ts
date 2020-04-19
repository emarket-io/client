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
  commodities: Commodity[] = [];
  formatRBM = utilsService.formatRMB;
  slideOpts = {
    slidesPerView: 4,
  };

  constructor(private router: Router) {
    this.keyword = this.router.getCurrentNavigation().extras.state.keyword;
  }

  ionViewWillEnter() {
    this.refresh();
  }

  gotoDetail(commodity: Commodity) {
    //utilsService.storage.set('detail', commodity);
    //this.router.navigateByUrl('/detail', { state: commodity });
    this.router.navigate(['commodity/detail'], { queryParams: { id: commodity.id }, state: commodity });
  }

  refresh(event: any = null) {
    let kw = new StringValue();
    kw.setValue(this.keyword);
    let stream = apiService.commodityClient.search(kw, apiService.metaData);
    let newCommodities = [];
    stream.on('data', response => {
      if (!this.commodities.some(item => item.id == response.id)) {
        this.commodities.push(response);
      }
      newCommodities.push(response);
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
      if (event) {
        event.target.complete();
      }
    });
    stream.on('end', () => {
      this.commodities = newCommodities;
      if (event) {
        event.target.complete();
      }
    });
  }
}
