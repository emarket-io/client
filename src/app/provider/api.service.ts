import { Injectable, Injector } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

//declare let AMap;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  injector: Injector;
  key = '';
  currentAddress = '湖北荆门市';
}

export const apiService = new ApiService();