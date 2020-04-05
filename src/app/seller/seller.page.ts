import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { utilsService } from '../providers/utils.service'

@Component({
  selector: 'app-seller',
  templateUrl: './seller.page.html',
  styleUrls: ['./seller.page.scss'],
})
export class SellerPage {

  constructor(private router: Router) {
  }

  ionViewWillEnter() {
    if (!utilsService.getUser()) {
      this.router.navigateByUrl('/login');
    }
  }

}
