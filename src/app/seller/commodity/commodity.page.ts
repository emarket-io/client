import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Commodity } from '../../../sdk/commodity_pb';
import { apiService, utilsService } from '../../providers/utils.service'


@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.page.html',
  styleUrls: ['./commodity.page.scss'],
})
export class CommodityPage {
  commodities: Commodity[];

  constructor() { }

  ionViewWillEnter() {
    this.commodities = []
    let requestCommodity = new Commodity();
    if (!utilsService.isAdmin()) {
      requestCommodity.ownerId = utilsService.getUser().id;
    }
    let stream = apiService.commodityClient.list(requestCommodity, apiService.metaData);
    stream.on('data', response => {
      this.commodities.push(response);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  async  delete(id) {
    const alert = await utilsService.injector.get(AlertController).create({
      //header: '确认!',
      message: '确认删除此商品？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            let rc = new Commodity();
            rc.id = id;
            apiService.commodityClient.delete(rc, apiService.metaData, (err: any, response: any) => {
              if (err) {
                utilsService.alert(JSON.stringify(err));
              } else {
                this.ionViewWillEnter();
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
