import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { Commodity } from '../../../sdk/commodity_pb';
import { environment } from '../../../environments/environment';
import { apiService, utilsService } from '../../providers/utils.service';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb';

declare let AMap;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('mySlider', { static: false }) slider: IonSlides;
  city = '定位中';
  host = environment.apiUrl;
  formatRBM = utilsService.formatRMB;
  slideTopOpts = {
    slidesPerView: 1,
    direction: "vertical",
    autoHeight: true,
    height: 150,
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

  constructor(
    private router: Router,
    private ngZone: NgZone) {
    utilsService.events(this.router.url).subscribe(item => {
      if (item === "enter") {
        this.slider.startAutoplay();
      }
      if (item === "leave") {
        this.slider.stopAutoplay();
      }
    });
  }

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
    this.slider.stopAutoplay();
  }

  ionViewDidEnter() {
    this.slider.startAutoplay();
  }

  gotoView(keyword: string) {
    this.router.navigateByUrl('/view', { state: { keyword: keyword } });
  }

  gotoDetail(commodity: Commodity) {
    //this.router.navigateByUrl('/detail', { state: commodity });
    this.router.navigate(['commodity/detail'], { queryParams: { id: commodity.id }, state: commodity });
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(resp => {
      AMap.convertFrom(resp.coords.longitude + "," + resp.coords.latitude, "gps", (status, result) => {
        if (status == "complete") {
          const positionInfo = [result.locations[0].P + '', result.locations[0].O + ''];

          AMap.service('AMap.Geocoder', () => {
            const geocoder = new AMap.Geocoder();
            geocoder.getAddress(positionInfo, (status, result) => {
              if (status === 'complete' && result.info === 'OK') {
                this.ngZone.run(() => {// refresh view
                  utilsService.location = result.regeocode;
                  this.city = utilsService.location.addressComponent.city + utilsService.location.addressComponent.district;
                  if (utilsService.location.addressComponent.city == '') {
                    this.city = utilsService.location.addressComponent.province + utilsService.location.addressComponent.district;
                  }
                });
              } else {
                console.log('获取地址失败', result, status);
              }
            });
          });
        } else {
          utilsService.alert("坐标转换失败," + status + "/" + result);
        }
      });
    }, err => {
      console.log(err);
      //utilsService.alert(JSON.stringify(err));
    });
  }
}
