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
  level1: any;
  level2: any;
  level3: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  level1Click(item) {
    this.level1 = item;
    this.level2 = null;
  }

  level2Click(item) {
    this.level2 = item;
    this.level3 = null;
  }

  level3Click(item) {
    utilsService.selectedCategory = this.level1.title + '->' + this.level2.key + '->' + item;
    this.router.navigateByUrl('/publish');
  }
}
