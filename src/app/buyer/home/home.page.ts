import { Component, ViewChild, ElementRef } from '@angular/core';
import { apiService, utilsService } from '../../providers/utils.service'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';

declare let AMap;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  // @ViewChild('map_container', null) map_container: ElementRef;
  // map: any; // 地图对象
  city = utilsService.address.addressComponent.city + utilsService.address.addressComponent.district;
  slideOpts = {
    slidesPerView: 1,
    autoplay: {
      delay: 2000,
    },
  };

  constructor(
    private router: Router,
    private geolocation: Geolocation) { }

  ionViewWillEnter() {
    this.getLocation();
  }

  openAddress() {
    this.router.navigateByUrl('/address');
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      AMap.service('AMap.Geocoder', () => {
        AMap.convertFrom(resp.coords.longitude + "," + resp.coords.latitude, "gps",
          (status, result) => {
            if (status == "complete") {
              const positionInfo = [result.locations[0].P + '', result.locations[0].O + ''];
              //this.map.setCenter(positionInfo);

              const geocoder = new AMap.Geocoder({});
              geocoder.getAddress(positionInfo, (status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                  utilsService.address = result.regeocode;
                  if (utilsService.address.addressComponent.city == '') {
                    utilsService.address.addressComponent.city = utilsService.address.addressComponent.province;
                  }
                  this.city = utilsService.address.addressComponent.city + utilsService.address.addressComponent.district;
                } else {
                  console.log('获取地址失败');
                }
              });
            } else {
              alert("坐标转换失败," + status + "/" + result);
            }
          });
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
