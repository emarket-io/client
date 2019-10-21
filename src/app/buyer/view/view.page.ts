import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Commodity } from '../../../sdk/commodity_pb';
import { environment } from '../../../environments/environment';
import { apiService,utilsService } from '../../providers/utils.service'

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  host = environment.apiUrl;
  commodities: Commodity[];
  key = utilsService.key;
  formatRBM = utilsService.formatRMB;
  slideOpts = {
    slidesPerView: 4,
  };

  constructor(private router: Router) { }

  ngOnInit() {
    this.commodities = []
    let stream = apiService.commodityClient.list((new Commodity), apiService.metaData);
    stream.on('data', response => {
      this.commodities.push(response);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      alert(JSON.stringify(err));
    });
  }

  back() {
    this.router.navigateByUrl('/tabs/category');
  }

  gotoDetail(commodity: Commodity) {
    utilsService.commodity = commodity;
    this.router.navigateByUrl('/detail');
  }
}
