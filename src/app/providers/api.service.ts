import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MessagesPromiseClient } from '../../sdk/message_grpc_web_pb';
import { OrdersPromiseClient, AccountsPromiseClient } from '../../sdk/order_grpc_web_pb';
import { UsersPromiseClient, AddressesPromiseClient, MemosPromiseClient } from '../../sdk/user_grpc_web_pb';
import { CommoditiesPromiseClient, CouponsPromiseClient, CommentsPromiseClient } from '../../sdk/commodity_grpc_web_pb';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  metaData = { 'authorization-token': 'admin' };

  commodityClient = new CommoditiesPromiseClient(environment.apiUrl, null, null);
  userClient = new UsersPromiseClient(environment.apiUrl, null, null);
  couponClient = new CouponsPromiseClient(environment.apiUrl, null, null);
  orderClient = new OrdersPromiseClient(environment.apiUrl, null, null);
  addressClient = new AddressesPromiseClient(environment.apiUrl, null, null);
  messageClient = new MessagesPromiseClient(environment.apiUrl, null, null);
  accountClient = new AccountsPromiseClient(environment.apiUrl, null, null);
  commentClient = new CommentsPromiseClient(environment.apiUrl, null, null);
  memoClient = new MemosPromiseClient(environment.apiUrl, null, null);

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
        { "name": "苹果", "src": "fruit/apple.png" },
        { "name": "猕猴桃", "src": "fruit/kiwi.png" },
        { "name": "草莓", "src": "fruit/caomei.png" },
        { "name": "橙子", "src": "fruit/orange.png" }],
      subCategories: {
        核仁类: ['苹果', '梨', '桃', '枣', '石榴', '山楂', '李子', '杏', '海棠果', '梅'],
        浆果类: ['葡萄', '猕猴桃', '柿子', '草莓', '圣女果', '无花果', '桑椹', '拐枣', '仙人掌果'],
        柑橘类: ['柑桔', '橙子', '柚子', '枸桔果'],
        茄果类: ['鲜辣椒', '西红柿', '茄子'],
        野果: ['八月炸', '刺梨', '羊奶果', '野地瓜']
      },
      // "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }, {
      "title": "坚果干果", "hots": [
        { "name": "核桃", "src": "fruit/hetao.jpg" },
        { "name": "巴旦木", "src": "fruit/badanmu.jpg" },
        { "name": "红枣", "src": "fruit/zao.jpg" },
        { "name": "葡萄干", "src": "fruit/putaogan.jpg" }],
      subCategories: {
        坚果: ['核桃', '栗子', '瓜子', '桂圆', '莲子', '松子', '榛子', '杏仁', '白果', '巴旦木', '夏威夷果', '腰果', '开心果', '碧根果'],
        干果: ['红枣', '枸杞', '葡萄干', '地瓜干', '红枣', '枸杞', '葡萄干', '地瓜干', '核桃仁', '柿饼', '桑葚干', '山楂干', '无花果干', '果脯', '金桔丁'],
      },
      //"names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }, {
      "title": "蔬菜", "hots": [
        { "name": "白菜", "src": "fruit/baicai.jpg" },
        { "name": "香菜", "src": "fruit/xiangcai.jpg" },
        { "name": "大蒜", "src": "fruit/dasuan.jpg" },
        { "name": "土豆", "src": "fruit/tudou.jpg" }],
      subCategories: {
        紫薯类: ['红薯', '土豆', '山药', '芋头', '雪莲果', '山药豆'],
        叶菜类: ['白菜', '芹菜', '莴苣', '香菜', '菠菜', '油菜', '生菜', '芥菜', '娃娃菜', '茼蒿', '菜薹', '茴香', '苦菊', '连白', '雪里红', '鸡毛菜', '苋菜'],
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
        { "name": "鸡蛋", "src": "fruit/egg.jpg" },
        { "name": "鹌鹑蛋", "src": "fruit/anchundan.jpg" },
        { "name": "鸭蛋", "src": "fruit/yadan.jpg" },
        { "name": "鸽子蛋", "src": "fruit/gezidan.jpg" }],
      subCategories: {
        //活禽: ['土鸡', '鸭', '鹅', '鸽子', '野鸡', '乌鸡', '鹌鹑', '麻雀'],
        蛋类: ['鸡蛋', '鸭蛋', '鹅蛋', '松花蛋', '鹌鹑蛋', '鸽子蛋'],
        禽畜特产: ['腊肉', '牛肉干', '香肠', '火腿', '腊肠', '风干鸡', '薰马肉', '风干鹅', '眼熏兔']
      },
    }, {
      "title": "茶叶", "hots": [
        { "name": "菊花茶", "src": "fruit/juhuacha.jpg" },
        { "name": "茉莉花", "src": "fruit/molihuacha.jpg" },
        { "name": "毛尖茶", "src": "fruit/maojiancha.jpg" },
        { "name": "乌龙茶", "src": "fruit/wulonghongcha.jpg" }],
      subCategories: {
        花果茶: ['菊花茶', '玫瑰花茶', '蒲公英茶', '茉莉花茶', '荷叶茶', '其他'],
        黑茶: ['普洱茶', '湖南黑茶', '湖北老青茶', '其他'],
        绿茶: ['毛尖茶', '龙井茶', '毛峰', '云雾茶', '碧落春', '其他'],
        红茶: ['滇红工夫', '乌龙红茶', '月红工夫', '其他']
      },
    }, {
      "title": "水产", "hots": [
        { "name": "鱼干", "src": "fruit/yugan.jpg" },
        { "name": "虾皮", "src": "fruit/xiapi.jpg" },
        { "name": "干虾", "src": "fruit/ganxia.jpg" },
        { "name": "花胶", "src": "fruit/huajiao.jpg" }],
      subCategories: {
        水产干货: ['鱼干', '干虾', '虾皮', '花胶', '其他']
      },
    }, {
      "title": "中药材", "hots": [
        { "name": "三七", "src": "fruit/sanqi.jpg" },
        { "name": "当归", "src": "fruit/danggui.jpg" },
        { "name": "连翘", "src": "fruit/lianqiao.jpg" },
        { "name": "金银花", "src": "fruit/jinyinhua.jpg" }],
      subCategories: {
        根茎类: ['人参', '天麻', '黄精', '三七', '重楼', '白笈', '当归'],
        果实籽仁类: ['茱萸', '五味子', '砂仁', '连翘'],
        全草类: ['石斛', '艾叶', '金线莲', '薄荷', '益母草'],
        花类: ['金银花', '藏红花'],
      },
      //"names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }, {
      "title": "农副/副食", "hots": [
        { "name": "花生油", "src": "fruit/huashengyou.jpg" },
        { "name": "香油", "src": "fruit/xiangyou.jpg" },
        { "name": "干笋", "src": "fruit/gansun.jpg" },
        { "name": "蕨菜干", "src": "fruit/juecaigan.jpg" }],
      subCategories: {
        粮油产品: ['粉条', '面粉', '花生油', '粉丝', '山茶油', '菜油', '核桃油', '面条', '香油', '胡麻油', '荞面'],
        调味品: ['花椒', '干辣椒', '八角', '干姜', '桂皮', '孜然', '香叶'],
        干货: ['黄花菜', '干豆角', '萝卜干', '干笋', '炒花生', '蓝莓干', '魔芋干', '干桂花', '蕨菜干'],
      },
      // "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }, {
      "title": "粮油作物", "hots": [
        { "name": "小米", "src": "fruit/xiaomi.jpg" },
        { "name": "荞麦", "src": "fruit/qiaomai.jpg" },
        { "name": "芝麻", "src": "fruit/zhima.jpg" },
        { "name": "黑豆", "src": "fruit/heidou.jpg" }],
      subCategories: {
        谷类作物: ['小米', '高粱', '薏米', '荞麦', '燕麦', '大麦', '青稞', '莜麦'],
        油类作物: ['芝麻', '油茶籽', '葵花', '菜籽'],
        豆类作物: ['黑豆', '黄豆', '大豆', '绿豆', '红豆', '蚕豆', '豌豆', '芸荳'],
      },
      //"names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }, {
      "title": "食用菌", "hots": [
        { "name": "黑木耳", "src": "fruit/heimuer.jpg" },
        { "name": "香菇", "src": "fruit/xianggu.jpg" },
        { "name": "茶树菇", "src": "fruit/chashugu.jpg" },
        { "name": "银耳", "src": "fruit/yiner.jpg" }],
      subCategories: {
        食用菌鲜货: ['灵芝', '黑木耳', '虫草', '蘑菇', '平菇', '香菇', '松茸', '银耳'],
        食用菌干货: ['干香菇', '猴头菇', '茶树菇', '竹燕窝', '菜籽']
      },
      // "names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }, {
      "title": "特种种植", "hots": [
        { "name": "苹果", "src": "fruit/apple.png" },
        { "name": "梨", "src": "fruit/pea.png" },
        { "name": "草莓", "src": "fruit/caomei.png" },
        { "name": "橙子", "src": "fruit/orange.png" }],
      //"names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }, {
      "title": "绿化苗木", "hots": [
        { "name": "苹果", "src": "fruit/apple.png" },
        { "name": "梨", "src": "fruit/pea.png" },
        { "name": "草莓", "src": "fruit/caomei.png" },
        { "name": "橙子", "src": "fruit/orange.png" }],
      //"names": ["苹果", "西瓜", "桔子", "葡萄", "桃子", "梨", "甜瓜", "橙子", "枣", "香蕉", "樱桃", "哈密瓜", "草莓", "猕猴桃", "柚子", "菠萝", "李子", "柿子", "芒果", "无花果", "杏", "榴莲", "龙眼", "荔枝", "柠檬", "其他"]
    }]
}