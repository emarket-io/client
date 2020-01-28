import { ApiService } from './api.service';
import { AlertController, ToastController } from '@ionic/angular';
import { User, Address } from '../../sdk/user_pb';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  injector: Injector;
  destination: Address;
  // https://lbs.amap.com/api/javascript-api/reference/lnglat-to-address#regeocode
  location = {
    formattedAddress: '湖北省荆门市',
    addressComponent: { province: '湖北省', city: "荆门市", district: '沙洋县' }
  };

  getUser(): User {
    if (!window.localStorage.getItem('user')) {
      return null
    }
    let jsonUser = JSON.parse(window.localStorage.getItem('user'));
    let user = new User();
    for (let key in jsonUser) {
      if (key.search('Map|created|cert|List') == -1) {
        user[key] = jsonUser[key]
      }
    }
    return user
  };

  setUser(user: User) {
    if (!user) {
      window.localStorage.removeItem('user');
    } else {
      window.localStorage.setItem('user', JSON.stringify(user.toObject()));
    }
  }

  formatRMB(value: string): string {
    if (!value) {
      return "0.00"
    }
    if (value.indexOf('.') == -1) {
      return value = value + ".00"
    }
    value = value + "00"
    return value.substring(0, value.indexOf(".") + 3);
  }

  async alert(content: string, title: string = '提示') {
    const alert = await this.injector.get(AlertController).create({
      subHeader: title,
      message: content,
      buttons: ['确定']
    });
    await alert.present();
  }

  async confirm(title: string, fn: Function, content?: string) {
    const alert = await this.injector.get(AlertController).create({
      subHeader: title,
      message: content,
      buttons: [
        {
          text: '取消'
        }, {
          text: '确定',
          handler: () => {
            fn();
          }
        }
      ]
    });
    await alert.present();
  }


  async toast(msg: string, cssClass?: string) {
    const toast = await this.injector.get(ToastController).create({
      message: msg,
      duration: 1000,
      translucent: true,
      cssClass: cssClass ? cssClass : 'toast-message',
      position: "middle",
    });
    toast.present();
  }

  check(value: string): boolean {
    return value.search('妈|测试|傻|逼|鸡巴') == -1;
  }
}

export const utilsService = new UtilsService();
export const apiService = new ApiService();