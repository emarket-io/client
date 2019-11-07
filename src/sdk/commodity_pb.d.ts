import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
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
  price: Price | undefined;
  hasprice(): boolean;
  clearprice(): void;
  amount: number;
  fare: number;
  ownerId: string;
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
    price?: Price.AsObject,
    amount: number,
    fare: number,
    ownerid: string,
    annotationsMap: Array<[string, string]>,
    created?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    updated?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class Price extends jspb.Message {
  single: number;
  group: number;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Price.AsObject;
  static toObject(includeInstance: boolean, msg: Price): Price.AsObject;
  static serializeBinaryToWriter(message: Price, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Price;
  static deserializeBinaryFromReader(message: Price, reader: jspb.BinaryReader): Price;
}

export namespace Price {
  export type AsObject = {
    single: number,
    group: number,
  }
}

export class Medium extends jspb.Message {
  image: string;
  video: string;
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
  }
}

