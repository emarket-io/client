/**
 * @fileoverview gRPC-Web generated client stub for zbay
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var user_pb = require('./user_pb.js')

var commodity_pb = require('./commodity_pb.js')

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js')

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')
const proto = {};
proto.zbay = require('./order_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.zbay.OrdersClient =
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
proto.zbay.OrdersPromiseClient =
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
 *   !proto.zbay.Order,
 *   !proto.zbay.Order>}
 */
const methodInfo_Orders_Add = new grpc.web.AbstractClientBase.MethodInfo(
  proto.zbay.Order,
  /** @param {!proto.zbay.Order} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.zbay.Order.deserializeBinary
);


/**
 * @param {!proto.zbay.Order} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.zbay.Order)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.zbay.Order>|undefined}
 *     The XHR Node Readable Stream
 */
proto.zbay.OrdersClient.prototype.add =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/zbay.Orders/Add',
      request,
      metadata || {},
      methodInfo_Orders_Add,
      callback);
};


/**
 * @param {!proto.zbay.Order} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.zbay.Order>}
 *     A native promise that resolves to the response
 */
proto.zbay.OrdersPromiseClient.prototype.add =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/zbay.Orders/Add',
      request,
      metadata || {},
      methodInfo_Orders_Add);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.zbay.Order,
 *   !proto.zbay.Order>}
 */
const methodInfo_Orders_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.zbay.Order,
  /** @param {!proto.zbay.Order} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.zbay.Order.deserializeBinary
);


/**
 * @param {!proto.zbay.Order} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.zbay.Order)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.zbay.Order>|undefined}
 *     The XHR Node Readable Stream
 */
proto.zbay.OrdersClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/zbay.Orders/Get',
      request,
      metadata || {},
      methodInfo_Orders_Get,
      callback);
};


/**
 * @param {!proto.zbay.Order} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.zbay.Order>}
 *     A native promise that resolves to the response
 */
proto.zbay.OrdersPromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/zbay.Orders/Get',
      request,
      metadata || {},
      methodInfo_Orders_Get);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.zbay.Order,
 *   !proto.zbay.Order>}
 */
const methodInfo_Orders_Update = new grpc.web.AbstractClientBase.MethodInfo(
  proto.zbay.Order,
  /** @param {!proto.zbay.Order} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.zbay.Order.deserializeBinary
);


/**
 * @param {!proto.zbay.Order} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.zbay.Order)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.zbay.Order>|undefined}
 *     The XHR Node Readable Stream
 */
proto.zbay.OrdersClient.prototype.update =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/zbay.Orders/Update',
      request,
      metadata || {},
      methodInfo_Orders_Update,
      callback);
};


/**
 * @param {!proto.zbay.Order} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.zbay.Order>}
 *     A native promise that resolves to the response
 */
proto.zbay.OrdersPromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/zbay.Orders/Update',
      request,
      metadata || {},
      methodInfo_Orders_Update);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.zbay.Order,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Orders_Delete = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.zbay.Order} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.zbay.Order} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.zbay.OrdersClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/zbay.Orders/Delete',
      request,
      metadata || {},
      methodInfo_Orders_Delete,
      callback);
};


/**
 * @param {!proto.zbay.Order} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.zbay.OrdersPromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/zbay.Orders/Delete',
      request,
      metadata || {},
      methodInfo_Orders_Delete);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.zbay.User,
 *   !proto.zbay.Order>}
 */
const methodInfo_Orders_ListByUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.zbay.Order,
  /** @param {!proto.zbay.User} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.zbay.Order.deserializeBinary
);


/**
 * @param {!proto.zbay.User} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.zbay.Order>}
 *     The XHR Node Readable Stream
 */
proto.zbay.OrdersClient.prototype.listByUser =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/zbay.Orders/ListByUser',
      request,
      metadata || {},
      methodInfo_Orders_ListByUser);
};


/**
 * @param {!proto.zbay.User} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.zbay.Order>}
 *     The XHR Node Readable Stream
 */
proto.zbay.OrdersPromiseClient.prototype.listByUser =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/zbay.Orders/ListByUser',
      request,
      metadata || {},
      methodInfo_Orders_ListByUser);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.zbay.Order,
 *   !proto.zbay.Order>}
 */
const methodInfo_Orders_ListByStatus = new grpc.web.AbstractClientBase.MethodInfo(
  proto.zbay.Order,
  /** @param {!proto.zbay.Order} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.zbay.Order.deserializeBinary
);


/**
 * @param {!proto.zbay.Order} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.zbay.Order>}
 *     The XHR Node Readable Stream
 */
proto.zbay.OrdersClient.prototype.listByStatus =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/zbay.Orders/ListByStatus',
      request,
      metadata || {},
      methodInfo_Orders_ListByStatus);
};


/**
 * @param {!proto.zbay.Order} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.zbay.Order>}
 *     The XHR Node Readable Stream
 */
proto.zbay.OrdersPromiseClient.prototype.listByStatus =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/zbay.Orders/ListByStatus',
      request,
      metadata || {},
      methodInfo_Orders_ListByStatus);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.zbay.Order,
 *   !proto.google.protobuf.StringValue>}
 */
const methodInfo_Orders_SignAlipay = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.StringValue,
  /** @param {!proto.zbay.Order} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.StringValue.deserializeBinary
);


/**
 * @param {!proto.zbay.Order} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.StringValue)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.StringValue>|undefined}
 *     The XHR Node Readable Stream
 */
proto.zbay.OrdersClient.prototype.signAlipay =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/zbay.Orders/SignAlipay',
      request,
      metadata || {},
      methodInfo_Orders_SignAlipay,
      callback);
};


/**
 * @param {!proto.zbay.Order} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.StringValue>}
 *     A native promise that resolves to the response
 */
proto.zbay.OrdersPromiseClient.prototype.signAlipay =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/zbay.Orders/SignAlipay',
      request,
      metadata || {},
      methodInfo_Orders_SignAlipay);
};


module.exports = proto.zbay;

