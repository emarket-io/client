import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { apiService } from '../../providers/api.service'


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

  items = [];
  //["热门分类", "水果", "蔬菜", "禽畜蛋肉", "茶叶", "水产", "中药材", "坚果干果", "农副/副食", "粮油作物", "食用菌", "特种种植", "绿化苗木"];
  currentItem: any;

  constructor(private router: Router) {
    let cat0 = {
      "title": "热门分类", "hots": [
        { "name": "苹果", "src": "fruit/apple.png" },
        { "name": "梨", "src": "fruit/pea.png" },
        { "name": "草莓", "src": "fruit/caomei.png" },
        { "name": "橙子", "src": "fruit/orange.png" }]
    };
    this.items[0] = cat0;
    this.currentItem = this.items[0];
    let cat1 = {
      "title": "水果", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    };
    this.items[1] = cat1;
    let cat2 = {
      "title": "蔬菜", "hots": [
        { "name": "苹果2", "src": "fruit/kiwi.png" },
        { "name": "梨2", "src": "fruit/apple.png" },
        { "name": "草莓2", "src": "fruit/shiliu.png" },
        { "name": "橙子2", "src": "fruit/caomei.png" }]
    };
    this.items[2] = cat2;
    let cat3 = {
      "title": "禽畜蛋肉", "hots": [
        { "name": "苹果3", "src": "fruit/pea.png" },
        { "name": "梨3", "src": "fruit/apple.png" },
        { "name": "草莓3", "src": "fruit/orange.png" },
        { "name": "橙子3", "src": "fruit/banana.png" }]
    };
    this.items[3] = cat3;
    let cat4 = {
      "title": "茶叶", "hots": [
        { "name": "苹果4", "src": "fruit/grape.png" },
        { "name": "梨4", "src": "fruit/apple.png" },
        { "name": "草莓4", "src": "fruit/orange.png" },
        { "name": "橙子4", "src": "fruit/caomei.png" }]
    };
    this.items[4] = cat4;
    let cat5 = {
      "title": "水产", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    };
    this.items[5] = cat5;
    let cat6 = {
      "title": "中药材", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    };
    this.items[6] = cat6;
    let cat7 = {
      "title": "坚果干果", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    };
    this.items[7] = cat7;
    let cat8 = {
      "title": "农副/副食", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    };
    this.items[8] = cat8;
    let cat9 = {
      "title": "粮油作物", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    };
    this.items[9] = cat9;
    let cat10 = {
      "title": "食用菌", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    };
    this.items[10] = cat10;
    let cat11 = {
      "title": "特种种植", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    };
    this.items[11] = cat11;
    let cat12 = {
      "title": "绿化苗木", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    };
    this.items[12] = cat12;
  }

  itemClick(item) {
    this.currentItem = item;
  }

  gotoView(key) {
    apiService.key = key;
    this.router.navigateByUrl('/view');
  }
}