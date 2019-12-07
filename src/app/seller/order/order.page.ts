import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Order, Express, ListQuery } from '../../../sdk/order_pb';
import { AlertController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { apiService, utilsService } from '../../providers/utils.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage {
  orders: Order[];
  host = environment.apiUrl;
  formatRBM = utilsService.formatRMB;

  constructor(
    private router: Router,
    private alertController: AlertController) { }

  ionViewWillEnter() {
    this.orders = []
    let startTime = new Date().getTime();
    let listQuery = new ListQuery();
    listQuery.user = utilsService.getUser();
    listQuery.status = '';
    let stream = apiService.orderClient.listForSeller(listQuery, apiService.metaData);
    stream.on('data', response => {
      let endTime = new Date().getTime();
      this.orders.push(response);
      //console.log(response.toObject())
      console.log(endTime - startTime);
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  destination(order: Order) {
    utilsService.alert(order.destination.contact + '<br/>' + order.destination.telephone + '<br/>' + order.destination.location, '发货地址');
  }

  gotoOrderDetail(order: Order) {
    this.router.navigateByUrl('seller_order_detail', { state: order });
  }

  async deliver(order: Order) {
    if (!order.express) {
      order.express = new Express();
    }
    const alert = await this.alertController.create({
      header: '快递单号',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          value: order.express.number,
          placeholder: '请输入快递单号'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        }, {
          text: '确定',
          handler: (alertData) => {
            if (!alertData.name1) {
              utilsService.alert('快递单号不能为空');
              return
            }
            order.status = '待收货';
            order.express.number = alertData.name1;
            apiService.orderClient.update(order, apiService.metaData, (err: any, response: Order) => {
              if (err) {
                utilsService.alert(JSON.stringify(err));
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
