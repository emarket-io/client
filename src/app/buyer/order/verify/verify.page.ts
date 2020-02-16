import * as grpcWeb from 'grpc-web';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, Groupon, } from '../../../../sdk/order_pb';
import { apiService, utilsService } from '../../../providers/utils.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage {

  constructor(
    private router: Router,
    private httpClient: HttpClient) { }

  ionViewWillEnter() {
    //utilsService.alert(utilsService.alipayQueryUrl);
    //utilsService.alert(JSON.stringify(utilsService.getOrder().toObject()));
    let preOrder = utilsService.getOrder();
    if (preOrder) {
      this.commitOrder(preOrder);
      utilsService.setOrder(null);
    }


    // this.httpClient.get(utilsService.alipayQueryUrl).subscribe(data => {
    //   utilsService.alert(JSON.stringify(data));
    //   console.log(data, data['alipay_trade_query_response']['code'], data['alipay_trade_query_response']['msg']);
    //   //if (data['alipay_trade_query_response']['code'] == '10000' && data['alipay_trade_query_response']['msg'] == 'Success') {
    //   //clearInterval(this.loop);
    //   //this.commitOrder();
    //   this.commitOrder(utilsService.order);
    //   // }
    // }, err => {
    //   utilsService.alert(JSON.stringify(err));
    //   console.log(JSON.stringify(err));
    // })
  }

  commitOrder(order: Order) {
    if (order.groupon && order.groupon.orderIdsList.length == 0) {
      order.status = '待成团';
    } else {
      order.status = '待发货';
    }

    apiService.orderClient.add(order, apiService.metaData, (err: grpcWeb.Error, response: Order) => {
      if (err) {
        utilsService.alert(JSON.stringify(err));
      } else {
        console.log(response);
        // update partner order status
        if (order.groupon && order.groupon.orderIdsList.length == 1) {
          var partnerOrder = new Order();
          partnerOrder.id = order.groupon.orderIdsList[0]
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
}
