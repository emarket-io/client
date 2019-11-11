import * as grpcWeb from 'grpc-web';

import * as user_pb from './user_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

import {Coupon} from './coupon_pb';

export class CouponsClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  add(
    request: Coupon,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Coupon) => void
  ): grpcWeb.ClientReadableStream<Coupon>;

  get(
    request: Coupon,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Coupon) => void
  ): grpcWeb.ClientReadableStream<Coupon>;

  update(
    request: Coupon,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Coupon) => void
  ): grpcWeb.ClientReadableStream<Coupon>;

  delete(
    request: Coupon,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  list(
    request: user_pb.User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Coupon>;

}

export class CouponsPromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  add(
    request: Coupon,
    metadata?: grpcWeb.Metadata
  ): Promise<Coupon>;

  get(
    request: Coupon,
    metadata?: grpcWeb.Metadata
  ): Promise<Coupon>;

  update(
    request: Coupon,
    metadata?: grpcWeb.Metadata
  ): Promise<Coupon>;

  delete(
    request: Coupon,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  list(
    request: user_pb.User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Coupon>;

}

