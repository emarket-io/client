import * as jspb from "google-protobuf"

import * as user_pb from './user_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

export class Order extends jspb.Message {
  id: string;
  commodityId: string;
  userId: string;
  destination: Position | undefined;
  hasdestination(): boolean;
  cleardestination(): void;
  quantity: number;
  amount: number;
  status: string;
  comment: string;
  payInfo: PayInfo | undefined;
  haspayInfo(): boolean;
  clearpayInfo(): void;
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
    commodityid: string,
    userid: string,
    destination?: Position.AsObject,
    quantity: number,
    amount: number,
    status: string,
    comment: string,
    payinfo?: PayInfo.AsObject,
    annotationsMap: Array<[string, string]>,
    created?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class Position extends jspb.Message {
  name: string;
  location: string;
  address: string;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Position.AsObject;
  static toObject(includeInstance: boolean, msg: Position): Position.AsObject;
  static serializeBinaryToWriter(message: Position, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Position;
  static deserializeBinaryFromReader(message: Position, reader: jspb.BinaryReader): Position;
}

export namespace Position {
  export type AsObject = {
    name: string,
    location: string,
    address: string,
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

