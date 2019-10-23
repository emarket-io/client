import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { apiService, utilsService } from '../../providers/utils.service'

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  categories = apiService.categories.slice(1, apiService.categories.length - 1);
  currentItem = this.categories[0];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  itemClick(item) {
    this.currentItem = item;
  }

  selectCategory(name: string) {
    utilsService.selectedCategory = this.currentItem.title + '->' + name;
    this.router.navigateByUrl('/publish');
  }
}
