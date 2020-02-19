import { Message } from 'google-protobuf';
import { ApiService } from './api.service';
import { Order } from '../../sdk/order_pb';
import { User, Address } from '../../sdk/user_pb';
import { AlertController, ToastController } from '@ionic/angular';
import { Injectable, Injector, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  injector: Injector;
  destination: Address;

  setOrder(order: Order) {
    if (!order) {
      localStorage.removeItem('order');
    } else {
      localStorage.setItem('order', Message.bytesAsB64(order.serializeBinary()));
    }
  }

  getOrder(): Order {
    if (!localStorage.getItem('order')) {
      return null
    }
    return Order.deserializeBinary(Message.bytesAsU8(localStorage.getItem('order')));
  }

  order: Order;
  // https://lbs.amap.com/api/javascript-api/reference/lnglat-to-address#regeocode
  location = {
    formattedAddress: '湖北省荆门市',
    addressComponent: { province: '湖北省', city: "荆门市", district: '沙洋县' }
  };

  eventMap = new Map<string, EventEmitter<any>>();

  events(topic: string): EventEmitter<any> {
    if (!this.eventMap.get(topic)) {
      this.eventMap.set(topic, new EventEmitter());
    }
    return this.eventMap.get(topic);
  }

  getUser(): User {
    if (!localStorage.getItem('user')) {
      return null
    }
    return User.deserializeBinary(Message.bytesAsU8(localStorage.getItem('user')));
  };

  setUser(user: User) {
    if (!user) {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', Message.bytesAsB64(user.serializeBinary()));
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