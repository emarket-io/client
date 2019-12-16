import { Component, ViewChild } from '@angular/core';
import { Commodity } from '../../../sdk/commodity_pb';
import { IonSlides } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { apiService, utilsService } from '../../providers/utils.service';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';

declare let AMap;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('mySlider', { static: false }) slider: IonSlides;
  city = utilsService.location.addressComponent.city + utilsService.location.addressComponent.district;
  host = environment.apiUrl;
  slideOpts = {
    slidesPerView: 3,
    slidesPerGroup: 3,
    autoplay: {
      delay: 2000,
    },
  };
  commodities: Commodity[];

  constructor(
    private router: Router,
    private geolocation: Geolocation) { }

  ionViewWillEnter() {
    this.commodities = []
    let kw = new StringValue();
    //kw.setValue(this.keyword);
    let stream = apiService.commodityClient.search(kw, apiService.metaData);
    stream.on('data', response => {
      this.commodities.push(response);
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
    this.getLocation();
  }

  ionViewWillLeave() {
    this.slider.stopAutoplay();
  }

  ionViewDidEnter() {
    this.slider.startAutoplay();
  }

  gotoView(keyword: string) {
    this.router.navigateByUrl('/view', { state: { keyword: keyword } });
  }

  async getLocation() {
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
