import { Commodity } from '../../sdk/commodity_pb';
import { Injectable, Injector } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommoditiesClient } from '../../sdk/commodity_grpc_web_pb';
import { UsersClient } from '../../sdk/user_grpc_web_pb';
import { MessagesClient } from '../../sdk/message_grpc_web_pb';


//declare let AMap;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  injector: Injector;
  key = '';
  commodity: Commodity;
  // https://lbs.amap.com/api/javascript-api/reference/lnglat-to-address#regeocode
  address = {
    formattedAddress: '湖北省荆门市',
    addressComponent: { province: '湖北', city: "荆门", district: '沙洋' }
  };

  commodityClient = new CommoditiesClient(environment.apiUrl, null, null);
  userClient = new UsersClient(environment.apiUrl, null, null);
  messageClient = new MessagesClient(environment.apiUrl, null, null);

  metaData = { 'authorization-token': 'admin' };
}

export const apiService = new ApiService();