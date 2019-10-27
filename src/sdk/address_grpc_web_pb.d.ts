import * as grpcWeb from 'grpc-web';

import * as user_pb from './user_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

import {Address} from './address_pb';

export class AddressesClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  add(
    request: Address,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Address) => void
  ): grpcWeb.ClientReadableStream<Address>;

  get(
    request: Address,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Address) => void
  ): grpcWeb.ClientReadableStream<Address>;

  update(
    request: Address,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Address) => void
  ): grpcWeb.ClientReadableStream<Address>;

  delete(
    request: Address,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  list(
    request: user_pb.User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Address>;

}

export class AddressesPromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  add(
    request: Address,
    metadata?: grpcWeb.Metadata
  ): Promise<Address>;

  get(
    request: Address,
    metadata?: grpcWeb.Metadata
  ): Promise<Address>;

  update(
    request: Address,
    metadata?: grpcWeb.Metadata
  ): Promise<Address>;

  delete(
    request: Address,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  list(
    request: user_pb.User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Address>;

}

