import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { apiService, utilsService } from '../../providers/utils.service'

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  currentItem: any;
  categories = apiService.categories.slice(1, apiService.categories.length - 1);

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
