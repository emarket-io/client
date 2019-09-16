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
    height: 550,
  };

  items = [];
  currentItem = '热门分类';
  constructor() {
    this.items[0] = "热门分类";
    this.items[1] = "水果";
    this.items[2] = "蔬菜";
    this.items[3] = "禽畜蛋肉";
    this.items[4] = "茶叶";
    this.items[5] = "水产";
    this.items[6] = "中药材";
    this.items[7] = "坚果干果";
    this.items[8] = "农副/副食";
    this.items[9] = "粮油作物";
    this.items[10] = "食用菌";
    this.items[11] = "特种种植";
    this.items[12] = "绿化苗木";
  }

  itemClick(item) {
    this.currentItem = item;
  }
}