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
  order = new Order();
  destination: Address;
  host = environment.apiUrl;
  commodity = utilsService.commodity;
  formatRBM = utilsService.formatRMB;

  constructor(
    private router: Router,
    private alipay: Alipay) {
    this.order.commodityId = utilsService.commodity.id;
    this.order.userId = 'TODO';
    this.order.destination = null;
    this.order.quantity = 1;
  }

  ionViewWillEnter() {
    this.destination = utilsService.destination;
    // this.addresses = []
    // let stream = apiService.addressClient.list((new User()), apiService.metaData);
    // stream.on('data', response => {
    //   this.addresses.push(response);
    //   console.log(response.toObject())
    // });
    // stream.on('error', err => {
    //   alert(JSON.stringify(err));
    // });
  }

  selectDestination() {
    this.router.navigateByUrl('/address');
  }

  preparebuy() {
    this.order.amount = utilsService.commodity.price.group * this.order.quantity;
    apiService.orderClient.signAlipay(this.order, apiService.metaData,
      (err: grpcWeb.Error, response: StringValue) => {
        if (err) {
          utilsService.alert(err.message)
        } {
          let payInfo = response.getValue();
          this.alipay.pay(payInfo).then(result => {
            console.log(result); // Success
            this.order.status = '待发货';
            apiService.orderClient.add(this.order, apiService.metaData, (err: grpcWeb.Error, response: Order) => {
              if (err) {
                utilsService.alert(JSON.stringify(err));
              } else {
                console.log(response);
                this.router.navigateByUrl('/tabs/cart');
              }
            });
          }).catch(error => {
            console.log(error); // Failed
            this.order.status = '待付款';
            apiService.orderClient.add(this.order, apiService.metaData, (err: grpcWeb.Error, response: Order) => {
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
