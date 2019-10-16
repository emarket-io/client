import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

import {Commodity} from './commodity_pb';

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
    request: Commodity,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Commodity>;

  delete(
    request: Commodity,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

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
    request: Commodity,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Commodity>;

  delete(
    request: Commodity,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

}

