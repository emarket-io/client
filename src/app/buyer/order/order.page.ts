import * as grpcWeb from 'grpc-web';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { User } from '../../../sdk/user_pb';
import { Order } from '../../../sdk/order_pb';
import { Address } from '../../../sdk/address_pb';
import { Alipay } from '@ionic-native/alipay/ngx';
import { environment } from '../../../environments/environment';
import { apiService, utilsService } from '../../providers/utils.service'
import { StringValue } from "google-protobuf/google/protobuf/wrappers_pb";

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage {
  address: Address;
  addresses: Address[];
  host = environment.apiUrl;
  commodity = utilsService.commodity;
  formatRBM = utilsService.formatRMB;

  constructor(
    private router: Router,
    private alipay: Alipay) { }

  ionViewWillEnter() {
    this.addresses = []
    let stream = apiService.addressClient.list((new User()), apiService.metaData);
    stream.on('data', response => {
      this.addresses.push(response);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      alert(JSON.stringify(err));
    });
  }

  preparebuy() {
    let order = new Order();
    order.commodityId = utilsService.commodity.id;
    order.userId = 'TODO';
    order.destination = null;
    order.quantity = 1;
    order.amount = 1;// 分
    order.status = '待发货';
    apiService.orderClient.signAlipay(order, apiService.metaData,
      (err: grpcWeb.Error, response: StringValue) => {
        if (err) {
          utilsService.alert(err.message)
        } {
          let payInfo = response.getValue();
          this.alipay.pay(payInfo).then(result => {
            console.log(result); // Success
            apiService.orderClient.add(order, apiService.metaData, (err: grpcWeb.Error, response: Order) => {
              if (err) {
                utilsService.alert(JSON.stringify(err));
              } else {
                console.log(response);
              }
            });
          }).catch(error => {
            console.log(error); // Failed
            alert(JSON.stringify(error));
            apiService.orderClient.add(order, apiService.metaData, (err: grpcWeb.Error, response: Order) => {
              if (err) {
                utilsService.alert(JSON.stringify(err));
              } else {
                console.log(response);
                this.router.navigateByUrl('/tabs/cart');
              }
            });
          });
        }
      });
  }
}
