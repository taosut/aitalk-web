// source: PacketType.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.PacketType', null, global);
/**
 * @enum {number}
 */
proto.PacketType = {
  CONNECT: 0,
  CONN_ACK: 1,
  PING: 2,
  PONG: 3,
  DISCONNECT: 4,
  MSG_DATA: 5,
  MSG_DATA_ACK: 6,
  CREATE_TEAM_REQ: 51,
  DISMISS_TEAM_REQ: 52,
  QUERY_MEMBER_LIST_REQ: 53
};

goog.object.extend(exports, proto);
