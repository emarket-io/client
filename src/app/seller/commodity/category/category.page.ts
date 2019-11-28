import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { apiService } from '../../../providers/utils.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage {
  level1: any;
  level2: any;
  level3: any;
  categories = apiService.categories.slice(1, apiService.categories.length - 1);

  constructor(private modalController: ModalController) { }

  level1Click(item) {
    this.level1 = item;
    this.level2 = null;
  }

  level2Click(item) {
    this.level2 = item;
    this.level3 = null;
  }

  level3Click(item) {
    let selectedCategory = this.level1.title + '→' + this.level2.key + '→' + item;
    this.modalController.dismiss({ category: selectedCategory });
  }
}
