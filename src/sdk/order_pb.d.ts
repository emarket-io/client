import * as jspb from "google-protobuf"

import * as user_pb from './user_pb';
import * as commodity_pb from './commodity_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

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

export class Groupon extends jspb.Message {
  userIdsList: Array<string>;
  clearuserIdsList(): void;
  addUserids(value: string, index?: number): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Groupon.AsObject;
  static toObject(includeInstance: boolean, msg: Groupon): Groupon.AsObject;
  static serializeBinaryToWriter(message: Groupon, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Groupon;
  static deserializeBinaryFromReader(message: Groupon, reader: jspb.BinaryReader): Groupon;
}

export namespace Groupon {
  export type AsObject = {
    useridsList: Array<string>,
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

