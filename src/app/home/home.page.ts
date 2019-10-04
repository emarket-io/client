import { Component } from '@angular/core';
import { apiService } from '../provider/api.service'
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare let AMap;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  address = apiService.currentAddress;
  constructor(private geolocation: Geolocation) { }

  ionViewWillEnter() {
    this.getLocation();
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      AMap.service('AMap.Geocoder', () => {
        AMap.convertFrom(resp.coords.longitude + "," + resp.coords.latitude, "gps",
          (status, result) => {
            if (status == "complete") {
              const positionInfo = [result.locations[0].P + '', result.locations[0].O + ''];
              const geocoder = new AMap.Geocoder({});
              geocoder.getAddress(positionInfo, (status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                  apiService.currentAddress = result.regeocode.formattedAddress;
                  this.address = apiService.currentAddress;
                } else {
                  alert('获取地址失败:' + status);
                }
              });
            } else {
              alert("坐标转换失败," + status + "/" + result);
            }
          });
      });
    }).catch((error) => {
      alert('Error getting location:' + error);
    });
  }
}
