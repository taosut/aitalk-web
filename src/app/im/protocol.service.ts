import {Injectable} from '@angular/core';
import {IMConfig} from './im.config';
import {PacketType} from './model/packet-type.enum';
import messageProtobuf from './lib/Message_pb.js';
import connectionProtobuf from './lib/Connection_pb.js';
import msgProtobuf from './lib/Msg_pb.js';
import packetTypeProtobuf from './lib/PacketType_pb.js';
// export const proto = require('./lib/Message_pb');
// export const connection = require('./lib/Connection_pb');
// export const msg = require('./lib/Msg_pb');
// export const packetType = require('./lib/PacketType_pb');
// export const team = require('./lib/Team_pb');


@Injectable({
  providedIn: 'root'
})
export class ProtocolService {
  constructor() {
    console.log('=================');
  }

  test() {
    console.log('tset');
    const message = new messageProtobuf.Message();
    message.setMagic(1);
    console.log(message.getMagic());
  }


  public messageEncoder(data: any, packetTypeModel: PacketType): Uint8Array {
    const message = new messageProtobuf.Message();
    message.setMagic(IMConfig.MAGIC);
    message.setVersion(IMConfig.VERSION);
    switch (packetTypeModel) {
      case PacketType.CONNECT:
        break;
      case PacketType.CONN_ACK:
        break;
      case PacketType.PING:
        break;
      case PacketType.PONG:
        break;
      case PacketType.DISCONNECT:
        break;
      case PacketType.MSG_DATA:
        break;
      case PacketType.MSG_DATA_ACK:
        break;
      case PacketType.CREATE_TEAM_REQ:
        break;
      case PacketType.DISMISS_TEAM_REQ:
        break;
      case PacketType.QUERY_MEMBER_LIST_REQ:
        break;
    }
    return message.serializeBinary();
  }

  public messageDecoder(data: Uint8Array): any {
    return messageProtobuf.Message.deserialize(data);
  }

}
