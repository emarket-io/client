import * as grpcWeb from 'grpc-web';

import * as user_pb from './user_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

import {
  Comment,
  Commodity,
  Coupon} from './commodity_pb';

export class CommoditiesClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  add(
    request: Commodity,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Commodity) => void
  ): grpcWeb.ClientReadableStream<Commodity>;

  get(
    request: Commodity,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Commodity) => void
  ): grpcWeb.ClientReadableStream<Commodity>;

  update(
    request: Commodity,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Commodity) => void
  ): grpcWeb.ClientReadableStream<Commodity>;

  list(
    request: user_pb.User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Commodity>;

  search(
    request: google_protobuf_wrappers_pb.StringValue,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Commodity>;

  delete(
    request: Commodity,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

}

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

export class CommentsClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  add(
    request: Comment,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Comment) => void
  ): grpcWeb.ClientReadableStream<Comment>;

  get(
    request: Comment,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Comment) => void
  ): grpcWeb.ClientReadableStream<Comment>;

  update(
    request: Comment,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Comment) => void
  ): grpcWeb.ClientReadableStream<Comment>;

  delete(
    request: Comment,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  list(
    request: Commodity,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Comment>;

}

export class CommoditiesPromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  add(
    request: Commodity,
    metadata?: grpcWeb.Metadata
  ): Promise<Commodity>;

  get(
    request: Commodity,
    metadata?: grpcWeb.Metadata
  ): Promise<Commodity>;

  update(
    request: Commodity,
    metadata?: grpcWeb.Metadata
  ): Promise<Commodity>;

  list(
    request: user_pb.User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Commodity>;

  search(
    request: google_protobuf_wrappers_pb.StringValue,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Commodity>;

  delete(
    request: Commodity,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

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

export class CommentsPromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  add(
    request: Comment,
    metadata?: grpcWeb.Metadata
  ): Promise<Comment>;

  get(
    request: Comment,
    metadata?: grpcWeb.Metadata
  ): Promise<Comment>;

  update(
    request: Comment,
    metadata?: grpcWeb.Metadata
  ): Promise<Comment>;

  delete(
    request: Comment,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  list(
    request: Commodity,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Comment>;

}

