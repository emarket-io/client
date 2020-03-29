import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

import {
  Address,
  Memo,
  User} from './user_pb';

export class UsersClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  add(
    request: User,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: User) => void
  ): grpcWeb.ClientReadableStream<User>;

  get(
    request: User,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: User) => void
  ): grpcWeb.ClientReadableStream<User>;

  update(
    request: User,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: User) => void
  ): grpcWeb.ClientReadableStream<User>;

  list(
    request: User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<User>;

  delete(
    request: User,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  login(
    request: User,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: User) => void
  ): grpcWeb.ClientReadableStream<User>;

  certificate(
    request: User,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: User) => void
  ): grpcWeb.ClientReadableStream<User>;

}

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
    request: User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Address>;

}

export class MemosClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  add(
    request: Memo,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Memo) => void
  ): grpcWeb.ClientReadableStream<Memo>;

  get(
    request: Memo,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Memo) => void
  ): grpcWeb.ClientReadableStream<Memo>;

  update(
    request: Memo,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Memo) => void
  ): grpcWeb.ClientReadableStream<Memo>;

  delete(
    request: Memo,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  list(
    request: User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Memo>;

}

export class UsersPromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  add(
    request: User,
    metadata?: grpcWeb.Metadata
  ): Promise<User>;

  get(
    request: User,
    metadata?: grpcWeb.Metadata
  ): Promise<User>;

  update(
    request: User,
    metadata?: grpcWeb.Metadata
  ): Promise<User>;

  list(
    request: User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<User>;

  delete(
    request: User,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  login(
    request: User,
    metadata?: grpcWeb.Metadata
  ): Promise<User>;

  certificate(
    request: User,
    metadata?: grpcWeb.Metadata
  ): Promise<User>;

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
    request: User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Address>;

}

export class MemosPromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  add(
    request: Memo,
    metadata?: grpcWeb.Metadata
  ): Promise<Memo>;

  get(
    request: Memo,
    metadata?: grpcWeb.Metadata
  ): Promise<Memo>;

  update(
    request: Memo,
    metadata?: grpcWeb.Metadata
  ): Promise<Memo>;

  delete(
    request: Memo,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  list(
    request: User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Memo>;

}

