import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { apiService, utilsService } from '../../providers/utils.service'


@Component({
  selector: 'app-category',
  templateUrl: 'category.page.html',
  styleUrls: ['category.page.scss']
})
export class CategoryPage {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    direction: "vertical",
    slidesPerView: 10,
    height: 500,
  };

  items = apiService.categories;
  level1 = this.items[0];

  constructor(private router: Router) { }

  level1Click(item) {
    this.level1 = item;
  }

  gotoView(keyword) {
    utilsService.keyword = keyword;
    this.router.navigateByUrl('/view');
  }
}