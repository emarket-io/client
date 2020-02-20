import * as grpcWeb from 'grpc-web';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActionSheetController } from '@ionic/angular';
import { Order, Groupon, PayMap } from '../../../../sdk/order_pb';
import { apiService, utilsService } from '../../../providers/utils.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage {

  order = utilsService.getOrder();
  formatRBM = utilsService.formatRMB;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private actionSheetController: ActionSheetController) { }

  async ionViewWillEnter() {
    this.order = utilsService.getOrder();
    if (this.order) {
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
              apiService.accountClient.wechatPay(pm, apiService.metaData, (err, response) => {
                if (err) {
                  utilsService.alert(JSON.stringify(err));
                } else {
                  if (response.kvMap.get('trade_state') == 'SUCCESS') {
                    this.commitOrder(this.order);
                  } else {
                    utilsService.toast('订单未支付');
                    this.router.navigateByUrl('/tabs/home');
                  }
                }
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
        apiService.accountClient.alipay(sr, apiService.metaData,
          (err: grpcWeb.Error, response) => {
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
                this.commitOrder(this.order);
              } else {
                utilsService.toast('订单未支付');
                this.router.navigateByUrl('/tabs/home');
              }
            });
          })
      }
    }
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
        utilsService.setOrder(null);
        this.router.navigateByUrl('/tabs/order');
      }
    });
  }
}
