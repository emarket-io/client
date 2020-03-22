import * as jspb from "google-protobuf"

import * as user_pb from './user_pb';
import * as commodity_pb from './commodity_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

export class Account extends jspb.Message {
  id: string;
  userId: string;
  amount: number;
  orderId: string;
  created: google_protobuf_timestamp_pb.Timestamp | undefined;
  hascreated(): boolean;
  clearcreated(): void;
  annotationsMap: jspb.Map<string, string>;
  clearannotationsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Account.AsObject;
  static toObject(includeInstance: boolean, msg: Account): Account.AsObject;
  static serializeBinaryToWriter(message: Account, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Account;
  static deserializeBinaryFromReader(message: Account, reader: jspb.BinaryReader): Account;
}

export namespace Account {
  export type AsObject = {
    id: string,
    userid: string,
    amount: number,
    orderid: string,
    created?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    annotationsMap: Array<[string, string]>,
  }
}

export class PayMap extends jspb.Message {
  url: string;
  kvMap: jspb.Map<string, string>;
  clearkvMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PayMap.AsObject;
  static toObject(includeInstance: boolean, msg: PayMap): PayMap.AsObject;
  static serializeBinaryToWriter(message: PayMap, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PayMap;
  static deserializeBinaryFromReader(message: PayMap, reader: jspb.BinaryReader): PayMap;
}

export namespace PayMap {
  export type AsObject = {
    url: string,
    kvMap: Array<[string, string]>,
  }
}

export class Order extends jspb.Message {
  id: string;
  snapshot: commodity_pb.Commodity | undefined;
  hassnapshot(): boolean;
  clearsnapshot(): void;
  groupon: Groupon | undefined;
  hasgroupon(): boolean;
  cleargroupon(): void;
  price: commodity_pb.Price | undefined;
  hasprice(): boolean;
  clearprice(): void;
  userId: string;
  destination: user_pb.Address | undefined;
  hasdestination(): boolean;
  cleardestination(): void;
  quantity: number;
  amount: number;
  status: string;
  comment: string;
  payInfo: PayInfo | undefined;
  haspayInfo(): boolean;
  clearpayInfo(): void;
  express: Express | undefined;
  hasexpress(): boolean;
  clearexpress(): void;
  annotationsMap: jspb.Map<string, string>;
  clearannotationsMap(): void;
  created: google_protobuf_timestamp_pb.Timestamp | undefined;
  hascreated(): boolean;
  clearcreated(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Order.AsObject;
  static toObject(includeInstance: boolean, msg: Order): Order.AsObject;
  static serializeBinaryToWriter(message: Order, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Order;
  static deserializeBinaryFromReader(message: Order, reader: jspb.BinaryReader): Order;
}

export namespace Order {
  export type AsObject = {
    id: string,
    snapshot?: commodity_pb.Commodity.AsObject,
    groupon?: Groupon.AsObject,
    price?: commodity_pb.Price.AsObject,
    userid: string,
    destination?: user_pb.Address.AsObject,
    quantity: number,
    amount: number,
    status: string,
    comment: string,
    payinfo?: PayInfo.AsObject,
    express?: Express.AsObject,
    annotationsMap: Array<[string, string]>,
    created?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class PayInfo extends jspb.Message {
  type: string;
  payResult: string;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PayInfo.AsObject;
  static toObject(includeInstance: boolean, msg: PayInfo): PayInfo.AsObject;
  static serializeBinaryToWriter(message: PayInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PayInfo;
  static deserializeBinaryFromReader(message: PayInfo, reader: jspb.BinaryReader): PayInfo;
}

export namespace PayInfo {
  export type AsObject = {
    type: string,
    payresult: string,
  }
}

export class WechatPayParams extends jspb.Message {
  appid: string;
  partnerid: string;
  prepayid: string;
  noncestr: string;
  timestamp: string;
  sign: string;
  mwebUrl: string;
  outTradeNo: string;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WechatPayParams.AsObject;
  static toObject(includeInstance: boolean, msg: WechatPayParams): WechatPayParams.AsObject;
  static serializeBinaryToWriter(message: WechatPayParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WechatPayParams;
  static deserializeBinaryFromReader(message: WechatPayParams, reader: jspb.BinaryReader): WechatPayParams;
}

export namespace WechatPayParams {
  export type AsObject = {
    appid: string,
    partnerid: string,
    prepayid: string,
    noncestr: string,
    timestamp: string,
    sign: string,
    mweburl: string,
    outtradeno: string,
  }
}

export class Groupon extends jspb.Message {
  orderIdsList: Array<string>;
  clearorderIdsList(): void;
  addOrderids(value: string, index?: number): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Groupon.AsObject;
  static toObject(includeInstance: boolean, msg: Groupon): Groupon.AsObject;
  static serializeBinaryToWriter(message: Groupon, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Groupon;
  static deserializeBinaryFromReader(message: Groupon, reader: jspb.BinaryReader): Groupon;
}

export namespace Groupon {
  export type AsObject = {
    orderidsList: Array<string>,
  }
}

export class Express extends jspb.Message {
  company: string;
  number: string;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Express.AsObject;
  static toObject(includeInstance: boolean, msg: Express): Express.AsObject;
  static serializeBinaryToWriter(message: Express, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Express;
  static deserializeBinaryFromReader(message: Express, reader: jspb.BinaryReader): Express;
}

export namespace Express {
  export type AsObject = {
    company: string,
    number: string,
  }
}

export class ListQuery extends jspb.Message {
  user: user_pb.User | undefined;
  hasuser(): boolean;
  clearuser(): void;
  status: string;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListQuery.AsObject;
  static toObject(includeInstance: boolean, msg: ListQuery): ListQuery.AsObject;
  static serializeBinaryToWriter(message: ListQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListQuery;
  static deserializeBinaryFromReader(message: ListQuery, reader: jspb.BinaryReader): ListQuery;
}

export namespace ListQuery {
  export type AsObject = {
    user?: user_pb.User.AsObject,
    status: string,
  }
}

