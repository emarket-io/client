import * as grpcWeb from 'grpc-web';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
//import { HttpClient } from '@angular/common/http';
import { Wechat } from '@ionic-native/wechat/ngx';
import { Alipay } from '@ionic-native/alipay/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { Order, PayInfo, Groupon, SignRequest } from '../../../sdk/order_pb';
import { environment } from '../../../environments/environment';
import { apiService, utilsService } from '../../providers/utils.service';
import { StringValue } from "google-protobuf/google/protobuf/wrappers_pb";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage {
  order: Order;
  host = environment.apiUrl;
  formatRBM = utilsService.formatRMB;
  loop: any;
  payUrl: string;
  modal: any;


  constructor(
    private router: Router,
    private wechat: Wechat,
    private location: Location,
    private alipay: Alipay,
    //private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private modalController: ModalController) {
    this.order = <Order>this.router.getCurrentNavigation().extras.state;
    this.order.payInfo = new PayInfo();
    this.order.payInfo.type = 'wechat';
    //this.payUrl= this.sanitizer.bypassSecurityTrustHtml('https://www.jianshu.com/'); 
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
    if (this.loop) {
      //clearInterval(this.loop);
    }
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
      let sr = new SignRequest();
      let bizContent = {
        subject: this.order.snapshot.title + '-订单费用',
        out_trade_no: 'zbay-' + (new Date().getTime()),
        product_code: 'QUICK_WAP_PAY',
        total_amount: this.order.amount / 100,
        quit_url: 'https://iyou.city',
      };

      sr.kvMap.set('biz_content', JSON.stringify(bizContent));
      sr.kvMap.set('app_id', '2019121169872457');
      sr.kvMap.set('method', 'alipay.trade.wap.pay');
      sr.kvMap.set('return_url', 'https://iyou.city/verify');
      sr.kvMap.set('charset', "utf-8");
      sr.kvMap.set('sign_type', "RSA2");
      //sr.kvMap.set("timestamp", new Date().toDateString());
      sr.kvMap.set('timestamp', '2020-02-12 08:43:59')
      sr.kvMap.set('version', '1.0');
      apiService.accountClient.signAlipay(sr, apiService.metaData,
        (err: grpcWeb.Error, response: StringValue) => {
          if (err) {
            utilsService.alert(err.message)
          } {
            let signValue = response.getValue();
            console.log('sr.kvMap', sr.kvMap);
            sr.kvMap.set('sign', signValue);

            let url = 'https://openapi.alipay.com/gateway.do?';
            let i = 0;
            sr.kvMap.forEach((value, key, map) => {
              if (i == 0) {
                url = url + key + "=" + value;
              } else {
                url = url + '&' + key + "=" + encodeURIComponent(value);
              }
              i = i + 1;
            });
            //console.log(url);
            //window.location.href = url;




            // query
            let queryBizContent = {
              out_trade_no: bizContent.out_trade_no,
            };
            sr.kvMap.set('method', 'alipay.trade.query')
            sr.kvMap.set('biz_content', JSON.stringify(queryBizContent));
            sr.kvMap.del('return_url');
            sr.kvMap.del('sign');
            apiService.accountClient.signAlipay(sr, apiService.metaData,
              (err: grpcWeb.Error, response: StringValue) => {
                sr.kvMap.set('sign', response.getValue());
                let queryUrl = 'https://openapi.alipay.com/gateway.do?';
                let i = 0;
                sr.kvMap.forEach((value, key, map) => {
                  if (i == 0) {
                    queryUrl = queryUrl + key + "=" + value;
                  } else {
                    queryUrl = queryUrl + '&' + key + "=" + encodeURIComponent(value);
                  }
                  i = i + 1;
                });
                console.log(queryUrl);
                utilsService.alipayQueryUrl = queryUrl;
                utilsService.setOrder(this.order);
                console.log(url);
                this.payUrl = url;

                window.location.href = url;
                // let at = document.createElement('a');
                // at.href = url;
                // at.click();
                //this.commitOrder();
                // this.loop = setInterval(() => {
                //   this.modal.dissmiss();  
                //   this.httpClient.get(queryUrl).subscribe(data => {
                //     //utilsService.alert(JSON.stringify(data));
                //     //console.log(data, data['alipay_trade_query_response']['code'], data['alipay_trade_query_response']['msg']);
                //     //if (data['alipay_trade_query_response']['code'] == '10000' && data['alipay_trade_query_response']['msg'] == 'Success') {
                //     this.modal.dissmiss();  
                //     clearInterval(this.loop);
                //       //this.modal.dissmiss();
                //       this.commitOrder();
                //    // }
                //   }, err => {
                //     this.modal.dissmiss();  
                //     clearInterval(this.loop);
                //     this.commitOrder();
                //     //utilsService.alert(JSON.stringify(err));
                //     console.log(JSON.stringify(err));
                //   })
                // }, 2000);
                // window.location.href = url;
                //this.location.go(url);
              });

            // this.alipay.pay(payInfo).then(result => {
            //   if (result.resultStatus == 9000) {
            //     this.commitOrder();
            //   } else {
            //     //utilsService.alert(JSON.stringify(result));
            //   }
            // }).catch(error => {
            //   console.log(error);
            //   utilsService.alert(JSON.stringify(err));
            // });
          }
        });
    } else if (this.order.payInfo.type == 'wechat') {
      apiService.accountClient.prepayWechat(this.order, apiService.metaData, (err, response) => {
        if (err) {
          utilsService.alert(JSON.stringify(err));
        } else {
          var params = {
            mch_id: response.partnerid,//'1571295871', // merchant id
            prepay_id: response.prepayid,//'wx24222039950964630869e1691366643900', // prepay id returned from server
            nonce: response.noncestr,//'your nonce', // nonce string returned from server
            timestamp: response.timestamp,//'1439531364', // timestamp
            sign: response.sign,//'0CB01533B8C1EF103065174F50BCA001', // signed string
          };
          this.wechat.sendPaymentRequest(params).then(() => {
            this.commitOrder();
            console.log("Success");
          }).catch(error => {
            console.log(error);
            //utilsService.alert(JSON.stringify(error));
          });
        }
      });
      //utilsService.alert('微信支付即将开通');
    }
  }

  commitOrder() {
    this.modal.dissmiss();
    if (this.order.groupon && this.order.groupon.orderIdsList.length == 0) {
      this.order.status = '待成团';
    } else {
      this.order.status = '待发货';
    }

    apiService.orderClient.add(this.order, apiService.metaData, (err: grpcWeb.Error, response: Order) => {
      if (err) {
        utilsService.alert(JSON.stringify(err));
      } else {
        console.log(response);
        // update partner order status
        if (this.order.groupon && this.order.groupon.orderIdsList.length == 1) {
          var partnerOrder = new Order();
          partnerOrder.id = this.order.groupon.orderIdsList[0]
          var groupon = new Groupon()
          groupon.orderIdsList.push(response.id);
          partnerOrder.groupon = groupon;
          partnerOrder.status = '待发货';
          apiService.orderClient.update(partnerOrder, apiService.metaData, (err: any, response: Order) => {
            if (err) {
              utilsService.alert(JSON.stringify(err));
            }
          });
        }
        this.router.navigateByUrl('/tabs/order');
      }
    });
  }

  onChangeHandler($event) {
    this.order.payInfo.type = $event.target.value;
  }

  trustUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
