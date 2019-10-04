import { Injectable, Injector } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare let AMap;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  injector: Injector;
  key = '';
  currentAddress = '湖北荆门市';




 getCurrentAddress():any {
    this.injector.get(Geolocation).getCurrentPosition().then((resp) => {
      AMap.service('AMap.Geocoder', () => {
        AMap.convertFrom(resp.coords.longitude + "," + resp.coords.latitude, "gps",
          (status, result) => {
            if (status == "complete") {
              const positionInfo = [result.locations[0].P + '', result.locations[0].O + ''];
              const geocoder = new AMap.Geocoder({});
              geocoder.getAddress(positionInfo, (status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                  // apiService.currentAddress = result.regeocode.formattedAddress;
                  // this.currentAddress = apiService.currentAddress;
                  return result.regeocode.formattedAddress;
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

export const apiService = new ApiService();