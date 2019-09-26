import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare let AMap;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  address = "北京昌平区"

  constructor(private geolocation: Geolocation) {
    this.getLocation();
  }

  ionViewWillEnter() {
    //this.getLocation();
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude + ', ' + resp.coords.longitude);
      AMap.service('AMap.Geocoder', () => {
        const geocoder = new AMap.Geocoder({
          // city: "010"
        });
        const positionInfo = [resp.coords.longitude + '', resp.coords.latitude + ''];
        geocoder.getAddress(positionInfo, (status, result) => {
          console.log(status, result, '转换定位信息');
          if (status === 'complete' && result.info === 'OK') {
            // 获得了有效的地址信息:
            this.address = result.regeocode.formattedAddress;
          } else {
            // 获取地址失败
            console.log('获取地址失败');
          }
        });
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
