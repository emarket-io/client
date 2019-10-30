import { ApiService } from './api.service'
import { AlertController } from '@ionic/angular';
import { Commodity } from '../../sdk/commodity_pb';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  injector: Injector;
  keyword = '';
  commodity: Commodity;
  selectedCategory = '';
  // https://lbs.amap.com/api/javascript-api/reference/lnglat-to-address#regeocode
  address = {
    formattedAddress: '湖北省荆门市',
    addressComponent: { province: '湖北省', city: "荆门市", district: '沙洋县' }
  };

  formatRMB(v: number): string {
    var strValue = v.toString();
    if (strValue.length == 1) {
      return '0.0' + strValue;
    }
    if (strValue.length == 2) {
      return '0.' + strValue;
    }

    return strValue.substring(0, strValue.length - 2) + '.' + strValue.substring(strValue.length - 2, strValue.length)
  }

  async alert(content: string, title: string = '提示') {
    const alert = await this.injector.get(AlertController).create({
      //header: title,
      subHeader: content,
      //message: content,
      buttons: ['OK']
    });
    await alert.present();
  }

}

export const utilsService = new UtilsService();
export const apiService = new ApiService();