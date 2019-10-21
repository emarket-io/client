import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { apiService,utilsService } from '../../providers/utils.service'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  host = environment.apiUrl;
  commodity = utilsService.commodity;
  formatRBM = utilsService.formatRMB;
  slideOpts = {
    slidesPerView: 1,
    autoplay: {
      delay: 2000,
    },
  };

  constructor(private router: Router) { }

  ionViewWillEnter() {
    this.commodity = utilsService.commodity;
  }

  back() {
    this.router.navigateByUrl('/view');
  }
}
