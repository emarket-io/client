import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IonSlides, Platform } from '@ionic/angular';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Commodity } from '../../../sdk/commodity_pb';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from '../../../environments/environment';
import { apiService, utilsService } from '../../providers/utils.service';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb';

declare let AMap;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  @ViewChild('mySlider', { static: false }) slider: IonSlides;
  city = utilsService.location.addressComponent.city + utilsService.location.addressComponent.district;
  formatRBM = utilsService.formatRMB;
  host = environment.apiUrl;
  slideTopOpts = {
    slidesPerView: 1,
    direction: "vertical",
    autoplay: {
      delay: 2000,
    },
  };
  slideOpts = {
    slidesPerView: 3,
    slidesPerGroup: 3,
    autoplay: {
      delay: 3000,
    },
  };
  commodities: Commodity[] = [];
  exitEvent: Subscription;

  constructor(
    private router: Router,
    private platform: Platform,
    private geolocation: Geolocation) { }

  ngOnInit() { }

  ionViewWillEnter() {
    let kw = new StringValue();
    //kw.setValue(this.keyword);
    let stream = apiService.commodityClient.search(kw, apiService.metaData);
    let newCommodities = [];
    stream.on('data', response => {
      if (!this.commodities.some(item => item.id == response.id)) {
        this.commodities.push(response);
      }
      newCommodities.push(response);
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
    stream.on('end', () => {
      this.commodities = newCommodities;
    });
    this.getLocation();
  }

  ionViewWillLeave() {
    this.exitEvent.unsubscribe();
    this.slider.stopAutoplay();
  }

  ionViewDidEnter() {
    this.slider.startAutoplay();
    this.exitEvent = this.platform.backButton.subscribeWithPriority(99999, () => {
      utilsService.confirm('确认退出[农村大集]客户端？', () => {
        navigator['app'].exitApp();
      });
    });
  }

  gotoView(keyword: string) {
    this.router.navigateByUrl('/view', { state: { keyword: keyword } });
  }

  gotoDetail(commodity: Commodity) {
    this.router.navigateByUrl('/detail', { state: commodity });
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
