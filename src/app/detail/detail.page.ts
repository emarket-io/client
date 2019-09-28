import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {

  slideOpts = {
    slidesPerView: 1,
    autoplay: {
      delay: 2000,
    },
  };

  constructor(private router: Router) { }

  back() {
    this.router.navigateByUrl('/view');
  }

}
