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

  items = ["热门分类", "水果", "蔬菜", "禽畜蛋肉", "茶叶", "水产", "中药材", "坚果干果", "农副/副食", "粮油作物", "食用菌", "特种种植", "绿化苗木"];
  currentItem = this.items[0];
  
  constructor() { }

  itemClick(item) {
    this.currentItem = item;
  }
}