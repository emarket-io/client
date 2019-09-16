import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    direction: "vertical",
    slidesPerView: 10,
  };

  items = [];
  currentItem = '热门分类';
  constructor() {
    this.items[0] = "热门分类";
    this.items[1] = "水果";
    this.items[2] = "蔬菜";
    this.items[3] = "禽畜蛋肉";
    this.items[4] = "水产";
    for (let i = 5; i < 20; i++) {
      this.items[i] = "menu" + i;
    }
  }

  itemClick(item) {
    this.currentItem = item;
  }
}