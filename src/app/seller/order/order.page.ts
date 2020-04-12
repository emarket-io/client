import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { Order, Express, ListQuery } from '../../../sdk/order_pb';
import { apiService, utilsService } from '../../providers/utils.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage {
  statuses: string[] = ['待发货', '待成团', '待退款', '待评价', '全部'];
  selectedStatus = this.statuses[0];
  orders: Order[];
  host = environment.apiUrl;
  formatRBM = utilsService.formatRMB;
  slideOpts = {
    slidesPerView: 3,
  };

  constructor(
    private router: Router,
    private alertController: AlertController) { }

  listByStatus(status: string) {
    this.selectedStatus = status;
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.orders = []
    let startTime = new Date().getTime();
    let listQuery = new ListQuery();
    listQuery.user = utilsService.getUser();
    listQuery.status = this.selectedStatus == "全部" ? '' : this.selectedStatus;
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
              return utilsService.alert('快递单号不能为空');
            }
            order.status = '待收货';
            order.express.number = alertData.name1;
            apiService.orderClient.update(order, apiService.metaData).catch(err => {
              utilsService.alert(JSON.stringify(err));
            })
          }
        }
      ]
    });

    await alert.present();
  }

  refund(order: Order) {
    if (order.status != "待退款") {
      return utilsService.alert('此订单非[待退款]状态');
    }

    utilsService.confirm('确定要退款给买家？', () => {
      order.status = '已退款';
      apiService.orderClient.update(order, apiService.metaData).then(response => {
        console.log(response);
        this.ionViewWillEnter();
      }).catch(err => {
        utilsService.alert(JSON.stringify(err));
      })
    }, () => { }, '买家理由：' + order.comment);
  }
}
