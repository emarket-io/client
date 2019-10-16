/**
 * @fileoverview gRPC-Web generated client stub for zbay
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')
const proto = {};
proto.zbay = require('./commodity_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.zbay.CommoditiesClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.zbay.CommoditiesPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.zbay.Commodity,
 *   !proto.zbay.Commodity>}
 */
const methodInfo_Commodities_Add = new grpc.web.AbstractClientBase.MethodInfo(
  proto.zbay.Commodity,
  /** @param {!proto.zbay.Commodity} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.zbay.Commodity.deserializeBinary
);


/**
 * @param {!proto.zbay.Commodity} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.zbay.Commodity)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.zbay.Commodity>|undefined}
 *     The XHR Node Readable Stream
 */
proto.zbay.CommoditiesClient.prototype.add =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/zbay.Commodities/Add',
      request,
      metadata || {},
      methodInfo_Commodities_Add,
      callback);
};


/**
 * @param {!proto.zbay.Commodity} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.zbay.Commodity>}
 *     A native promise that resolves to the response
 */
proto.zbay.CommoditiesPromiseClient.prototype.add =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/zbay.Commodities/Add',
      request,
      metadata || {},
      methodInfo_Commodities_Add);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.zbay.Commodity,
 *   !proto.zbay.Commodity>}
 */
const methodInfo_Commodities_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.zbay.Commodity,
  /** @param {!proto.zbay.Commodity} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.zbay.Commodity.deserializeBinary
);


/**
 * @param {!proto.zbay.Commodity} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.zbay.Commodity)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.zbay.Commodity>|undefined}
 *     The XHR Node Readable Stream
 */
proto.zbay.CommoditiesClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/zbay.Commodities/Get',
      request,
      metadata || {},
      methodInfo_Commodities_Get,
      callback);
};


/**
 * @param {!proto.zbay.Commodity} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.zbay.Commodity>}
 *     A native promise that resolves to the response
 */
proto.zbay.CommoditiesPromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/zbay.Commodities/Get',
      request,
      metadata || {},
      methodInfo_Commodities_Get);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.zbay.Commodity,
 *   !proto.zbay.Commodity>}
 */
const methodInfo_Commodities_Update = new grpc.web.AbstractClientBase.MethodInfo(
  proto.zbay.Commodity,
  /** @param {!proto.zbay.Commodity} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.zbay.Commodity.deserializeBinary
);


/**
 * @param {!proto.zbay.Commodity} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.zbay.Commodity)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.zbay.Commodity>|undefined}
 *     The XHR Node Readable Stream
 */
proto.zbay.CommoditiesClient.prototype.update =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/zbay.Commodities/Update',
      request,
      metadata || {},
      methodInfo_Commodities_Update,
      callback);
};


/**
 * @param {!proto.zbay.Commodity} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.zbay.Commodity>}
 *     A native promise that resolves to the response
 */
proto.zbay.CommoditiesPromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/zbay.Commodities/Update',
      request,
      metadata || {},
      methodInfo_Commodities_Update);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.zbay.Commodity,
 *   !proto.zbay.Commodity>}
 */
const methodInfo_Commodities_List = new grpc.web.AbstractClientBase.MethodInfo(
  proto.zbay.Commodity,
  /** @param {!proto.zbay.Commodity} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.zbay.Commodity.deserializeBinary
);


/**
 * @param {!proto.zbay.Commodity} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.zbay.Commodity>}
 *     The XHR Node Readable Stream
 */
proto.zbay.CommoditiesClient.prototype.list =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/zbay.Commodities/List',
      request,
      metadata || {},
      methodInfo_Commodities_List);
};


/**
 * @param {!proto.zbay.Commodity} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.zbay.Commodity>}
 *     The XHR Node Readable Stream
 */
proto.zbay.CommoditiesPromiseClient.prototype.list =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/zbay.Commodities/List',
      request,
      metadata || {},
      methodInfo_Commodities_List);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.zbay.Commodity,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Commodities_Delete = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.zbay.Commodity} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.zbay.Commodity} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.zbay.CommoditiesClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/zbay.Commodities/Delete',
      request,
      metadata || {},
      methodInfo_Commodities_Delete,
      callback);
};


/**
 * @param {!proto.zbay.Commodity} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.zbay.CommoditiesPromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/zbay.Commodities/Delete',
      request,
      metadata || {},
      methodInfo_Commodities_Delete);
};


module.exports = proto.zbay;

