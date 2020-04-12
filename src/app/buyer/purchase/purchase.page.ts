import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActionSheetController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { Order, PayInfo, PayMap, Groupon } from '../../../sdk/order_pb';
import { apiService, utilsService } from '../../providers/utils.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage {
  order: Order;
  host = environment.apiUrl;
  formatRBM = utilsService.formatRMB;

  constructor(
    private router: Router,
    //private location: Location,
    private httpClient: HttpClient,
    private actionSheetController: ActionSheetController) {
    if (!utilsService.paraMap['purchase']) {
      this.order = utilsService.storage.get('order', Order);
    } else {
      this.order = utilsService.paraMap['purchase'];
      this.order.payInfo = new PayInfo();
      this.order.payInfo.type = 'wechat';
    }
  }

  async verify() {
    if (this.order.payInfo.type == 'wechat') {
      const actionSheet = await this.actionSheetController.create({
        header: '请确认微信支付是否已完成',
        backdropDismiss: false,
        buttons: [{
          text: '已完成支付',
          role: 'destructive',
          icon: 'briefcase',
          handler: () => {
            let pm = new PayMap();
            pm.url = 'https://api.mch.weixin.qq.com/pay/orderquery';
            pm.kvMap.set('out_trade_no', this.order.payInfo.payResult);
            apiService.accountClient.wechatPay(pm, apiService.metaData).then(response => {
              if (response.kvMap.get('trade_state') == 'SUCCESS') {
                this.commitOrder();
              } else {
                utilsService.toast('订单未支付');
                this.router.navigateByUrl('/tabs/home');
              }
            }).catch(err => {
              utilsService.alert(JSON.stringify(err));
            });
          }
        }, {
          text: '支付遇到问题，已取消',
          icon: 'backspace',
          handler: () => {
            utilsService.toast('订单未支付');
            this.router.navigateByUrl('/tabs/home');
          }
        }]
      });
      await actionSheet.present();
    } else { //alipay
      // query
      let sr = new PayMap();
      let queryBizContent = {
        out_trade_no: this.order.payInfo.payResult,
      };
      sr.kvMap.set('method', 'alipay.trade.query')
      sr.kvMap.set('biz_content', JSON.stringify(queryBizContent));
      apiService.accountClient.alipay(sr, apiService.metaData).then(response => {
        let queryUrl = 'https://openapi.alipay.com/gateway.do?';
        let i = 0;
        response.kvMap.forEach((value, key, map) => {
          if (i == 0) {
            queryUrl = queryUrl + key + "=" + value;
          } else {
            queryUrl = queryUrl + '&' + key + "=" + encodeURIComponent(value);
          }
          i = i + 1;
        });
        console.log(queryUrl);
        this.httpClient.get(queryUrl).subscribe(data => {
          //console.log(data, data['alipay_trade_query_response']['code'], data['alipay_trade_query_response']['msg']);
          if (data['alipay_trade_query_response']['code'] == '10000' && data['alipay_trade_query_response']['msg'] == 'Success') {
            this.commitOrder();
          } else {
            utilsService.toast('订单未支付');
            this.router.navigateByUrl('/tabs/home');
          }
        });
      }).catch(err => {
        utilsService.alert(JSON.stringify(err));
      });
    }
  }

  ionViewWillEnter() {
    // after pay
    if (!utilsService.paraMap['purchase']) {
      this.order = utilsService.storage.get('order', Order);
      return this.verify();
    } else {
      this.order = utilsService.paraMap['purchase'];
      this.order.payInfo = new PayInfo();
      this.order.payInfo.type = 'wechat';
    }

    if (!utilsService.getUser()) {
      return this.router.navigateByUrl('/login');
    }
    if (!utilsService.destination) {
      let stream = apiService.addressClient.list(utilsService.getUser(), apiService.metaData);
      stream.on('data', response => {
        this.order.destination = response;
        if (response.default) {
          this.order.destination = response;
        }
      });
      stream.on('error', err => {
        utilsService.alert(JSON.stringify(err));
      });
    }
    this.order.userId = utilsService.getUser().id;
    this.order.destination = utilsService.destination;
    this.order.amount = Math.round(Number(this.order.groupon ? this.order.price.group : this.order.price.single) * 100 * this.order.quantity);
  }

  ionViewWillLeave() { }

  increment() {
    this.order.quantity += 1;
    this.order.amount = Math.round(Number(this.order.groupon ? this.order.price.group : this.order.price.single) * 100 * this.order.quantity);
  }

  decrement() {
    this.order.quantity -= 1;
    this.order.amount = Math.round(Number(this.order.groupon ? this.order.price.group : this.order.price.single) * 100 * this.order.quantity);
  }

  preparebuy() {
    if (!this.order.destination) {
      return utilsService.alert('请输入收货地址');
    }
    if (this.order.userId == this.order.snapshot.ownerId) {
      return utilsService.alert('请勿自卖自买');
    }
    if (this.order.payInfo.type == 'alipay') {
      let sr = new PayMap();
      let bizContent = {
        subject: this.order.snapshot.title + '-订单费用',
        out_trade_no: 'zbay-' + (new Date().getTime()),
        product_code: 'QUICK_WAP_PAY',
        total_amount: this.order.amount / 100,
        quit_url: 'https://iyou.city',
      };

      sr.kvMap.set('biz_content', JSON.stringify(bizContent));
      sr.kvMap.set('method', 'alipay.trade.wap.pay');
      sr.kvMap.set('return_url', 'https://iyou.city/purchase');
      apiService.accountClient.alipay(sr, apiService.metaData).then(response => {
        let url = 'https://openapi.alipay.com/gateway.do?';
        let i = 0;
        response.kvMap.forEach((value, key, map) => {
          if (i == 0) {
            url = url + key + "=" + value;
          } else {
            url = url + '&' + key + "=" + encodeURIComponent(value);
          }
          i = i + 1;
        });
        this.order.payInfo.payResult = bizContent.out_trade_no;
        utilsService.storage.set('order', this.order);
        console.log(url);
        location.assign(url);
      }).catch(err => {
        utilsService.alert(err.message)
      })
    } else if (this.order.payInfo.type == 'wechat') {
      let pm = new PayMap();
      pm.url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
      pm.kvMap.set('body', this.order.snapshot.title + '-订单费用');
      pm.kvMap.set('notify_url', 'www.yourserver.com/wxpayNotify');
      pm.kvMap.set('trade_type', 'MWEB');
      pm.kvMap.set('total_fee', this.order.amount + '');
      pm.kvMap.set('out_trade_no', 'daji-' + new Date().getTime());

      apiService.accountClient.wechatPay(pm, apiService.metaData).then(response => {
        // redirect_url is unstable
        let url = response.kvMap.get('mweb_url'); //+ '&redirect_url=' + encodeURIComponent('https://iyou.city/purchase');
        console.log(url);
        // for query
        this.order.payInfo.payResult = pm.kvMap.get('out_trade_no');
        utilsService.storage.set('order', this.order);
        location.assign(url);
        //this.router.navigateByUrl('/verify');
      }).catch(err => {
        utilsService.alert(JSON.stringify(err));
      })
    }
  }

  commitOrder() {
    if (this.order.groupon && this.order.groupon.orderIdsList.length == 0) {
      this.order.status = '待成团';
    } else {
      this.order.status = '待发货';
    }

    apiService.orderClient.add(this.order, apiService.metaData).then(response => {
      console.log(response);
      // update partner order status
      if (this.order.groupon && this.order.groupon.orderIdsList.length == 1) {
        var partnerOrder = new Order();
        partnerOrder.id = this.order.groupon.orderIdsList[0]
        var groupon = new Groupon()
        groupon.orderIdsList.push(response.id);
        partnerOrder.groupon = groupon;
        partnerOrder.status = '待发货';
        apiService.orderClient.update(partnerOrder, apiService.metaData).then().catch(err => {
          utilsService.alert(JSON.stringify(err));
        })
      }
      this.router.navigateByUrl('/tabs/order');
    }).catch(err => {
      utilsService.alert(JSON.stringify(err));
    })
  }

  onChangeHandler($event) {
    this.order.payInfo.type = $event.target.value;
  }
}
