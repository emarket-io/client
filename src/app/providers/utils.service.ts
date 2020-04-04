import { Message } from 'google-protobuf';
import { ApiService } from './api.service';
import { Address, User } from '../../sdk/user_pb';
import { AlertController, ToastController } from '@ionic/angular';
import { Injectable, Injector, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  injector: Injector;
  destination: Address;
  storage = new MesssageStorage();

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

  paraMap = new Map<string, any>();

  getUser(): User {
    return this.storage.get('user', User)
  }

  setUser(user: User) {
    this.storage.set('user', user);
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
      backdropDismiss: false,
      message: content,
      buttons: ['确定']
    });
    await alert.present();
  }

  async confirm(title: string, fn: Function, fx?: Function, content?: string) {
    const alert = await this.injector.get(AlertController).create({
      subHeader: title,
      message: content,
      buttons: [
        {
          text: '取消',
          handler: () => {
            fx();
          }
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
      cssClass: cssClass ? cssClass : 'toast-message',
      position: "middle",
    });
    toast.present();
  }

  check(value: string): boolean {
    return value.search('妈|测试|傻|逼|鸡巴') == -1;
  }
}


export class MesssageStorage {

  get(key: string, clazz: any) {
    if (!localStorage.getItem(key)) {
      return null
    }
    return clazz.deserializeBinary(Message.bytesAsU8(localStorage.getItem(key)));
  }

  set(key: string, msg: Message) {
    if (!msg) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, Message.bytesAsB64(msg.serializeBinary()));
    }
  }
}

export const utilsService = new UtilsService();
export const apiService = new ApiService();