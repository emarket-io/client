import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommoditiesClient } from '../../sdk/commodity_grpc_web_pb';
import { UsersClient } from '../../sdk/user_grpc_web_pb';
import { MessagesClient } from '../../sdk/message_grpc_web_pb';

//declare let AMap;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  metaData = { 'authorization-token': 'admin' };

  commodityClient = new CommoditiesClient(environment.apiUrl, null, null);
  userClient = new UsersClient(environment.apiUrl, null, null);
  messageClient = new MessagesClient(environment.apiUrl, null, null);
}