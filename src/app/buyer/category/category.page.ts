import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { apiService } from '../../providers/utils.service'


@Component({
  selector: 'app-category',
  templateUrl: 'category.page.html',
  styleUrls: ['category.page.scss']
})
export class CategoryPage {
  items = apiService.categories;
  level1 = this.items[1];

  constructor(private router: Router) { }

  level1Click(item) {
    this.level1 = item;
  }

  gotoView(keyword: string) {
    this.router.navigateByUrl('/view', { state: { keyword: keyword } });
  }
}