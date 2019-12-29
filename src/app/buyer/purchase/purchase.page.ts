import * as grpcWeb from 'grpc-web';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Wechat } from '@ionic-native/wechat/ngx';
import { Alipay } from '@ionic-native/alipay/ngx';
import { Order, PayInfo, Groupon } from '../../../sdk/order_pb';
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

  constructor(
    private router: Router,
    private wechat: Wechat,
    private alipay: Alipay) {
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
    if (this.order.payInfo.type == 'alipay') {
      console.log(this.order.toObject());
      apiService.accountClient.signAlipay(this.order, apiService.metaData,
        (err: grpcWeb.Error, response: StringValue) => {
          if (err) {
            utilsService.alert(err.message)
          } {
            let payInfo = response.getValue();
            this.alipay.pay(payInfo).then(result => {
              if (result.resultStatus == 9000) {
                this.commitOrder();
              } else {
                //utilsService.alert(JSON.stringify(result));
              }
            }).catch(error => {
              console.log(error);
              utilsService.alert(JSON.stringify(err));
            });
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
}
