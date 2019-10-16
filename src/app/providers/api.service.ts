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
  currentAddress = '湖北荆门市';

  commodityClient = new CommoditiesClient(environment.apiUrl,null,null);
  userClient = new UsersClient(environment.apiUrl,null,null);
  messageClient = new MessagesClient(environment.apiUrl,null,null);
  
  metaData = { 'authorization-token': 'admin' };
}

export const apiService = new ApiService();