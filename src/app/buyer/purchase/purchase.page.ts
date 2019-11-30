import * as grpcWeb from 'grpc-web';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Alipay } from '@ionic-native/alipay/ngx';
import { Order, PayInfo } from '../../../sdk/order_pb';
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
    private alipay: Alipay) {
    this.order = <Order>this.router.getCurrentNavigation().extras.state;
    this.order.payInfo = new PayInfo();
    this.order.payInfo.type = 'alipay';
  }

  ionViewWillEnter() {
    if (!utilsService.getUser()) {
      this.router.navigateByUrl('/login');
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
    this.order.quantity = 1;
    this.order.amount = Number(this.order.price.group) * 100 * this.order.quantity;
  }

  increment() {
    this.order.quantity += 1;
    this.order.amount = Number(this.order.price.group) * 100 * this.order.quantity;
  }

  decrement() {
    this.order.quantity -= 1;
    this.order.amount = Number(this.order.price.group) * 100 * this.order.quantity;
  }

  preparebuy() {
    if (this.order.payInfo.type == 'alipay') {
      apiService.orderClient.signAlipay(this.order, apiService.metaData,
        (err: grpcWeb.Error, response: StringValue) => {
          if (err) {
            utilsService.alert(err.message)
          } {
            let payInfo = response.getValue();
            this.alipay.pay(payInfo)
              .then(result => {
                if (result.resultStatus == 9000) {
                  this.order.status = '待发货';
                } else {
                  utilsService.alert(JSON.stringify(result));
                  this.order.status = '待付款';
                }
                apiService.orderClient.add(this.order, apiService.metaData, (err: grpcWeb.Error, response: Order) => {
                  if (err) {
                    utilsService.alert(JSON.stringify(err));
                  } else {
                    console.log(response);
                    this.router.navigateByUrl('/tabs/cart');
                  }
                });
              }).catch(error => {
                console.log(error);
                utilsService.alert(JSON.stringify(err));
              });
          }
        });
    } else if (this.order.payInfo.type == 'wechat') {
      utilsService.alert('微信支付即将开通');
    }
  }

  onChangeHandler($event) {
    this.order.payInfo.type = $event.target.value;
  }
}
