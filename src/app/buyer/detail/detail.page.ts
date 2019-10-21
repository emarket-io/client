import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { apiService } from 'src/app/providers/api.service';
import { utilsService } from '../../providers/utils.service'
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  host = environment.apiUrl;
  commodity = apiService.commodity;
  formatRBM = utilsService.formatRMB;
  slideOpts = {
    slidesPerView: 1,
    autoplay: {
      delay: 2000,
    },
  };

  constructor(private router: Router) { }

  ionViewWillEnter() {
    this.commodity = apiService.commodity;
  }

  back() {
    this.router.navigateByUrl('/view');
  }

}
