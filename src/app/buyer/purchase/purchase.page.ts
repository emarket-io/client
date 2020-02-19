import * as grpcWeb from 'grpc-web';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
//import { Wechat } from '@ionic-native/wechat/ngx';
//import { Alipay } from '@ionic-native/alipay/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { Order, PayInfo, PayMap } from '../../../sdk/order_pb';
import { environment } from '../../../environments/environment';
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
    // wechat: Wechat,
    private location: Location,
    //private alipay: Alipay,
    //private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private modalController: ModalController) {
    this.order = <Order>this.router.getCurrentNavigation().extras.state;
    this.order.payInfo = new PayInfo();
    this.order.payInfo.type = 'wechat';
  }

  ionViewWillEnter() {
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
    this.order.amount = ~~(Number(this.order.groupon ? this.order.price.group : this.order.price.single) * 100 * this.order.quantity);
  }

  ionViewWillLeave() {
    //if (this.loop) {
    //clearInterval(this.loop);
    //}
  }

  increment() {
    this.order.quantity += 1;
    this.order.amount = ~~(Number(this.order.groupon ? this.order.price.group : this.order.price.single) * 100 * this.order.quantity);
  }

  decrement() {
    this.order.quantity -= 1;
    this.order.amount = ~~(Number(this.order.groupon ? this.order.price.group : this.order.price.single) * 100 * this.order.quantity);
  }

  preparebuy() {
    if (!this.order.destination) {
      return utilsService.alert('请输入收货地址');
    }
    if (this.order.userId == this.order.snapshot.ownerId) {
      return utilsService.alert('请勿自卖自买');
    }
    if (this.order.payInfo.type == 'alipay') {
      //console.log(this.order.toObject());
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
      sr.kvMap.set('return_url', 'https://iyou.city/verify');
      apiService.accountClient.alipay(sr, apiService.metaData,
        (err: grpcWeb.Error, response) => {
          if (err) {
            utilsService.alert(err.message)
          } {
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
            utilsService.setOrder(this.order);
            console.log(url);
            window.location.replace(url);
          }
        });
    } else if (this.order.payInfo.type == 'wechat') {
      let pm = new PayMap();
      pm.url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
      pm.kvMap.set('body', this.order.snapshot.title + '-订单费用');
      pm.kvMap.set('notify_url', 'www.yourserver.com/wxpayNotify');
      pm.kvMap.set('trade_type', 'MWEB');
      pm.kvMap.set('total_fee', this.order.amount + '');
      pm.kvMap.set('out_trade_no', 'daji-' + new Date().getTime());

      apiService.accountClient.wechatPay(pm, apiService.metaData, (err, response) => {
        if (err) {
          utilsService.alert(JSON.stringify(err));
        } else {
          let url = response.kvMap.get('mweb_url') + '&redirect_url=' + encodeURIComponent('https://iyou.city/verify')
          console.log(url);
          // for query
          this.order.payInfo.payResult = pm.kvMap.get('out_trade_no');
          utilsService.setOrder(this.order);
          window.location.replace(url);
        }
      });
    }
  }

  // commitOrder() {
  //   if (this.order.groupon && this.order.groupon.orderIdsList.length == 0) {
  //     this.order.status = '待成团';
  //   } else {
  //     this.order.status = '待发货';
  //   }

  //   apiService.orderClient.add(this.order, apiService.metaData, (err: grpcWeb.Error, response: Order) => {
  //     if (err) {
  //       utilsService.alert(JSON.stringify(err));
  //     } else {
  //       console.log(response);
  //       // update partner order status
  //       if (this.order.groupon && this.order.groupon.orderIdsList.length == 1) {
  //         var partnerOrder = new Order();
  //         partnerOrder.id = this.order.groupon.orderIdsList[0]
  //         var groupon = new Groupon()
  //         groupon.orderIdsList.push(response.id);
  //         partnerOrder.groupon = groupon;
  //         partnerOrder.status = '待发货';
  //         apiService.orderClient.update(partnerOrder, apiService.metaData, (err: any, response: Order) => {
  //           if (err) {
  //             utilsService.alert(JSON.stringify(err));
  //           }
  //         });
  //       }
  //       this.router.navigateByUrl('/tabs/order');
  //     }
  //   });
  // }

  onChangeHandler($event) {
    this.order.payInfo.type = $event.target.value;
  }

  trustUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
