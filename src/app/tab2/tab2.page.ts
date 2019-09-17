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
  //["热门分类", "水果", "蔬菜", "禽畜蛋肉", "茶叶", "水产", "中药材", "坚果干果", "农副/副食", "粮油作物", "食用菌", "特种种植", "绿化苗木"];
  currentItem: any;

  constructor() {
    let cat0 = {
      "title": "热门分类", "images": [
        { "name": "苹果", "src": "fruit/apple.png" },
        { "name": "梨", "src": "fruit/pea.png" },
        { "name": "草莓", "src": "fruit/caomei.png" },
        { "name": "橙子", "src": "fruit/orange.png" }]
    };
    this.items[0] = cat0;
    this.currentItem = this.items[0];
    let cat1 = {
      "title": "水果", "images": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }]
    };
    this.items[1] = cat1;
    let cat2 = {
      "title": "蔬菜", "images": [
        { "name": "苹果2", "src": "fruit/kiwi.png" },
        { "name": "梨2", "src": "fruit/apple.png" },
        { "name": "草莓2", "src": "fruit/shiliu.png" },
        { "name": "橙子2", "src": "fruit/caomei.png" }]
    };
    this.items[2] = cat2;
    let cat3 = {
      "title": "禽畜蛋肉", "images": [
        { "name": "苹果3", "src": "fruit/pea.png" },
        { "name": "梨3", "src": "fruit/apple.png" },
        { "name": "草莓3", "src": "fruit/orange.png" },
        { "name": "橙子3", "src": "fruit/banana.png" }]
    };
    this.items[3] = cat3;
    let cat4 = {
      "title": "茶叶", "images": [
        { "name": "苹果4", "src": "fruit/grape.png" },
        { "name": "梨4", "src": "fruit/apple.png" },
        { "name": "草莓4", "src": "fruit/orange.png" },
        { "name": "橙子4", "src": "fruit/caomei.png" }]
    };
    this.items[4] = cat4;
  }

  itemClick(item) {
    this.currentItem = item;
  }
}

export class Category {
  title: string;
  images: any[]
}

export class image {
  name: string;
  src: string;
}