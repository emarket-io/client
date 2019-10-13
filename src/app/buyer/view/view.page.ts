import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { apiService } from '../../providers/api.service'

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage {

  key = apiService.key;
  slideOpts = {
    slidesPerView: 4,
  };

  constructor(private router: Router) { }

  back() {
    this.router.navigateByUrl('/tabs/category');
  }

  gotoDetail(key) {
    this.router.navigateByUrl('/detail');
  }
}
