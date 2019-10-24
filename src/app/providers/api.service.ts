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
        { "name": "橙子2", "src": "fruit/caomei.png" }],
      subCategories: {
        紫薯类: ['红薯', '土豆', '山药', '芋头', '雪莲果', '山药豆'],
        叶菜类: ['白柴', '芹菜', '莴苣', '香菜', '菠菜', '油菜', '生菜', '芥菜', '娃娃菜', '茼蒿', '菜薹', '茴香', '苦菊', '连白', '雪里红', '鸡毛菜', '苋菜'],
        葱蒜类: ['大葱', '生姜', '大蒜', '洋葱', '韭菜', '小葱'],
        茄果类: ['鲜辣椒', '西红柿', '茄子'],
        瓜类: ['南瓜', '冬瓜', '黄瓜', '西葫芦', '苦瓜', '丝瓜', '葫芦', '北瓜'],
        根茎类: ['萝卜', '百合', '魔芋', '榨菜', '山葵', '蒲菜'],
        豆类: ['缸豆', '四季豆', '豌豆', '扁豆', '蛇豆', '芸荳'],
        野菜特菜: ['蒲公英', '鱼腥草', '秋葵', '白花菜', '马齿苋', '芥菜', '地皮菜', '蕨菜', '槐花', '龙须菜', '冰草', '贡菜', '芝麻叶', '山野菜', '桑芽菜', '阳河', '食用玫瑰', '藤三七', '马兰头', '枸杞叶', '红薯梗', '人参菜', '核桃花', '芝麻叶', '穿心连叶', '攀枝花', '薯尖', '甜七', '蕁麻叶', '天绿香', '榆钱', '帝王菜', '雷公菜', '夜香花', '火镰菜', '板蓝根', '崖香', '血通菜'],
        水生类: ['莲藕', '荸荠', '海带', '紫菜', '菱角', '茭白', '慈姑', '莲蓬', '香蒲', '石花菜', '海木耳', '芡实杆', '西洋菜'],
        笋类: ['竹笋', '芦笋', '笋干', '冬笋', '罗汉笋', '甘蔗笋', '八度笋', '蒲笋']
      }
    }, {
      "title": "禽畜蛋肉", "hots": [
        { "name": "苹果3", "src": "fruit/pea.png" },
        { "name": "梨3", "src": "fruit/apple.png" },
        { "name": "草莓3", "src": "fruit/orange.png" },
        { "name": "橙子3", "src": "fruit/banana.png" }],
      subCategories: {
        活禽: ['土鸡', '鸭', '鹅', '鸽子', '野鸡', '乌鸡', '鹌鹑', '麻雀'],
        蛋类: ['鸡蛋', '鸭蛋', '鹅蛋', '松花蛋', '鹌鹑蛋', '鸽子蛋'],
        畜畜特产: ['腊肉', '牛肉干', '香肠', '火腿', '腊肠', '风干鸡', '薰马肉', '风干鹅', '眼熏兔']
      },
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
      subCategories: {
        水产干货: ['鱼干', '干虾', '虾皮', '花胶', '其他']
      },
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