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
  city = utilsService.location.addressComponent.city + utilsService.location.addressComponent.district;
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

  openView(keyword: string) {
    this.router.navigateByUrl('/view');
  }

  async getLocation() {
    // AMap.service('AMap.Geolocation', () => {
    //   let geolocation = new AMap.Geolocation({
    //     enableHighAccuracy: true,//是否使用高精度定位，默认:true
    //     timeout: 100000,          //超过10秒后停止定位，默认：无穷大
    //     // maximumAge: 0,           //定位结果缓存0毫秒，默认：0
    //     // convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
    //     // showButton: true,        //显示定位按钮，默认：true
    //     // buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
    //     // buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    //     // showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
    //     // showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
    //     // panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
    //     // zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    //   });
    //   geolocation.getCurrentPosition((status, result) => {
    //     if (status === 'complete' && result.info === 'OK') {
    //       utilsService.location = result.regeocode;
    //       this.city = utilsService.location.addressComponent.city + utilsService.location.addressComponent.district;
    //       if (utilsService.location.addressComponent.city == '') {
    //         this.city = utilsService.location.addressComponent.province + utilsService.location.addressComponent.district;
    //       }
    //     } else {
    //       console.log(JSON.stringify(status) + JSON.stringify(result));
    //     }
    //   });
    // });

    this.geolocation.getCurrentPosition().then((resp) => {
      AMap.convertFrom(resp.coords.longitude + "," + resp.coords.latitude, "gps", (status, result) => {
        if (status == "complete") {
          const positionInfo = [result.locations[0].P + '', result.locations[0].O + ''];

          AMap.service('AMap.Geocoder', () => {
            const geocoder = new AMap.Geocoder();
            geocoder.getAddress(positionInfo, (status, result) => {
              if (status === 'complete' && result.info === 'OK') {
                utilsService.location = result.regeocode;
                this.city = utilsService.location.addressComponent.city + utilsService.location.addressComponent.district;
                if (utilsService.location.addressComponent.city == '') {
                  this.city = utilsService.location.addressComponent.province + utilsService.location.addressComponent.district;
                }
              } else {
                console.log('获取地址失败', result, status);
              }
            });
          });
        } else {
          alert("坐标转换失败," + status + "/" + result);
        }
      });
    }).catch((error) => {
      console.log('Error getting location', error);
      //utilsService.alert(JSON.stringify(error));
    });
  }
}
