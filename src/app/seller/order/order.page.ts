import { Component } from '@angular/core';
import { User } from '../../../sdk/user_pb';
import { Order, Express } from '../../../sdk/order_pb';
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

  constructor(private alertController: AlertController) { }

  ionViewWillEnter() {
    this.orders = []
    let user = new User();
    if (!utilsService.isAdmin()) {
      user.id = utilsService.getUser().id;
    }
    let stream = apiService.orderClient.list(user, apiService.metaData);
    stream.on('data', response => {
      this.orders.push(response);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  async deliver(order: Order) {
    if (!order.express) {
      order.express = new Express();
    }
    const alert = await this.alertController.create({
      header: '快递单号',
      inputs: [
        // {
        //   name: 'name1',
        //   type: 'text',
        //   value: order.express.company,
        //   placeholder: '快递公司拼音'
        // },
        {
          name: 'name2',
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
            //order.express.company = alertData.name1;
            order.express.number = alertData.name2;
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
