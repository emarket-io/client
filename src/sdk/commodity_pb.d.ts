import * as jspb from "google-protobuf"

import * as user_pb from './user_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

export class Commodity extends jspb.Message {
  id: string;
  title: string;
  category: string;
  content: string;
  mediaList: Array<Medium>;
  clearmediaList(): void;
  addMedia(value?: Medium, index?: number): Medium;
  city: string;
  pricesList: Array<Price>;
  clearpricesList(): void;
  addPrices(value?: Price, index?: number): Price;
  inventory: number;
  expressFare: number;
  tagsList: Array<string>;
  cleartagsList(): void;
  addTags(value: string, index?: number): void;
  ownerId: string;
  status: string;
  annotationsMap: jspb.Map<string, string>;
  clearannotationsMap(): void;
  created: google_protobuf_timestamp_pb.Timestamp | undefined;
  hascreated(): boolean;
  clearcreated(): void;
  updated: google_protobuf_timestamp_pb.Timestamp | undefined;
  hasupdated(): boolean;
  clearupdated(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Commodity.AsObject;
  static toObject(includeInstance: boolean, msg: Commodity): Commodity.AsObject;
  static serializeBinaryToWriter(message: Commodity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Commodity;
  static deserializeBinaryFromReader(message: Commodity, reader: jspb.BinaryReader): Commodity;
}

export namespace Commodity {
  export type AsObject = {
    id: string,
    title: string,
    category: string,
    content: string,
    mediaList: Array<Medium.AsObject>,
    city: string,
    pricesList: Array<Price.AsObject>,
    inventory: number,
    expressfare: number,
    tagsList: Array<string>,
    ownerid: string,
    status: string,
    annotationsMap: Array<[string, string]>,
    created?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    updated?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class Price extends jspb.Message {
  name: string;
  single: string;
  group: string;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Price.AsObject;
  static toObject(includeInstance: boolean, msg: Price): Price.AsObject;
  static serializeBinaryToWriter(message: Price, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Price;
  static deserializeBinaryFromReader(message: Price, reader: jspb.BinaryReader): Price;
}

export namespace Price {
  export type AsObject = {
    name: string,
    single: string,
    group: string,
  }
}

export class Medium extends jspb.Message {
  image: string;
  video: string;
  isFirst: boolean;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Medium.AsObject;
  static toObject(includeInstance: boolean, msg: Medium): Medium.AsObject;
  static serializeBinaryToWriter(message: Medium, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Medium;
  static deserializeBinaryFromReader(message: Medium, reader: jspb.BinaryReader): Medium;
}

export namespace Medium {
  export type AsObject = {
    image: string,
    video: string,
    isfirst: boolean,
  }
}

export class Coupon extends jspb.Message {
  id: string;
  name: string;
  commodityId: string;
  denomination: number;
  count: number;
  limit: number;
  begin: google_protobuf_timestamp_pb.Timestamp | undefined;
  hasbegin(): boolean;
  clearbegin(): void;
  end: google_protobuf_timestamp_pb.Timestamp | undefined;
  hasend(): boolean;
  clearend(): void;
  owner: string;
  annotationsMap: jspb.Map<string, string>;
  clearannotationsMap(): void;
  created: google_protobuf_timestamp_pb.Timestamp | undefined;
  hascreated(): boolean;
  clearcreated(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Coupon.AsObject;
  static toObject(includeInstance: boolean, msg: Coupon): Coupon.AsObject;
  static serializeBinaryToWriter(message: Coupon, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Coupon;
  static deserializeBinaryFromReader(message: Coupon, reader: jspb.BinaryReader): Coupon;
}

export namespace Coupon {
  export type AsObject = {
    id: string,
    name: string,
    commodityid: string,
    denomination: number,
    count: number,
    limit: number,
    begin?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    end?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    owner: string,
    annotationsMap: Array<[string, string]>,
    created?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class Comment extends jspb.Message {
  id: string;
  commodityId: string;
  content: string;
  keywordsList: Array<string>;
  clearkeywordsList(): void;
  addKeywords(value: string, index?: number): void;
  star: number;
  owner: string;
  annotationsMap: jspb.Map<string, string>;
  clearannotationsMap(): void;
  created: google_protobuf_timestamp_pb.Timestamp | undefined;
  hascreated(): boolean;
  clearcreated(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Comment.AsObject;
  static toObject(includeInstance: boolean, msg: Comment): Comment.AsObject;
  static serializeBinaryToWriter(message: Comment, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Comment;
  static deserializeBinaryFromReader(message: Comment, reader: jspb.BinaryReader): Comment;
}

export namespace Comment {
  export type AsObject = {
    id: string,
    commodityid: string,
    content: string,
    keywordsList: Array<string>,
    star: number,
    owner: string,
    annotationsMap: Array<[string, string]>,
    created?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

