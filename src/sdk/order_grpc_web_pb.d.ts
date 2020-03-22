import * as grpcWeb from 'grpc-web';

import * as user_pb from './user_pb';
import * as commodity_pb from './commodity_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

import {
  Account,
  ListQuery,
  Order,
  PayMap} from './order_pb';

export class OrdersClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  add(
    request: Order,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Order) => void
  ): grpcWeb.ClientReadableStream<Order>;

  get(
    request: Order,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Order) => void
  ): grpcWeb.ClientReadableStream<Order>;

  update(
    request: Order,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Order) => void
  ): grpcWeb.ClientReadableStream<Order>;

  delete(
    request: Order,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  listByOrder(
    request: Order,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Order>;

  listForBuyer(
    request: ListQuery,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Order>;

  listForSeller(
    request: ListQuery,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Order>;

}

export class AccountsClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  add(
    request: Account,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Account) => void
  ): grpcWeb.ClientReadableStream<Account>;

  list(
    request: user_pb.User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Account>;

  total(
    request: Account,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Account) => void
  ): grpcWeb.ClientReadableStream<Account>;

  alipay(
    request: PayMap,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: PayMap) => void
  ): grpcWeb.ClientReadableStream<PayMap>;

  wechatPay(
    request: PayMap,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: PayMap) => void
  ): grpcWeb.ClientReadableStream<PayMap>;

}

export class OrdersPromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  add(
    request: Order,
    metadata?: grpcWeb.Metadata
  ): Promise<Order>;

  get(
    request: Order,
    metadata?: grpcWeb.Metadata
  ): Promise<Order>;

  update(
    request: Order,
    metadata?: grpcWeb.Metadata
  ): Promise<Order>;

  delete(
    request: Order,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  listByOrder(
    request: Order,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Order>;

  listForBuyer(
    request: ListQuery,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Order>;

  listForSeller(
    request: ListQuery,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Order>;

}

export class AccountsPromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  add(
    request: Account,
    metadata?: grpcWeb.Metadata
  ): Promise<Account>;

  list(
    request: user_pb.User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Account>;

  total(
    request: Account,
    metadata?: grpcWeb.Metadata
  ): Promise<Account>;

  alipay(
    request: PayMap,
    metadata?: grpcWeb.Metadata
  ): Promise<PayMap>;

  wechatPay(
    request: PayMap,
    metadata?: grpcWeb.Metadata
  ): Promise<PayMap>;

}

