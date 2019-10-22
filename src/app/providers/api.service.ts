import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommoditiesClient } from '../../sdk/commodity_grpc_web_pb';
import { UsersClient } from '../../sdk/user_grpc_web_pb';
import { MessagesClient } from '../../sdk/message_grpc_web_pb';

//declare let AMap;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  metaData = { 'authorization-token': 'admin' };

  commodityClient = new CommoditiesClient(environment.apiUrl, null, null);
  userClient = new UsersClient(environment.apiUrl, null, null);
  messageClient = new MessagesClient(environment.apiUrl, null, null);

  constructor() { }

  categories = [
    {
      "title": "热门分类", "hots": [
        { "name": "苹果", "src": "fruit/apple.png" },
        { "name": "梨", "src": "fruit/pea.png" },
        { "name": "草莓", "src": "fruit/caomei.png" },
        { "name": "橙子", "src": "fruit/orange.png" }]
    }, {
      "title": "水果", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }, {
      "title": "蔬菜", "hots": [
        { "name": "苹果2", "src": "fruit/kiwi.png" },
        { "name": "梨2", "src": "fruit/apple.png" },
        { "name": "草莓2", "src": "fruit/shiliu.png" },
        { "name": "橙子2", "src": "fruit/caomei.png" }]
    }, {
      "title": "禽畜蛋肉", "hots": [
        { "name": "苹果3", "src": "fruit/pea.png" },
        { "name": "梨3", "src": "fruit/apple.png" },
        { "name": "草莓3", "src": "fruit/orange.png" },
        { "name": "橙子3", "src": "fruit/banana.png" }]
    }, {
      "title": "茶叶", "hots": [
        { "name": "苹果4", "src": "fruit/grape.png" },
        { "name": "梨4", "src": "fruit/apple.png" },
        { "name": "草莓4", "src": "fruit/orange.png" },
        { "name": "橙子4", "src": "fruit/caomei.png" }]
    }, {
      "title": "水产", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }, {
      "title": "中药材", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }, {
      "title": "坚果干果", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }, {
      "title": "农副/副食", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }, {
      "title": "粮油作物", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }, {
      "title": "食用菌", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }, {
      "title": "特种种植", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }, {
      "title": "绿化苗木", "hots": [
        { "name": "苹果1", "src": "fruit/pea.png" },
        { "name": "梨1", "src": "fruit/apple.png" },
        { "name": "草莓1", "src": "fruit/caomei.png" },
        { "name": "橙子1", "src": "fruit/orange.png" }],
      "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }]
}