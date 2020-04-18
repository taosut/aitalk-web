import {Inject, Injectable} from '@angular/core';
import {PacketType} from './model/packet-type.enum';
import MessageProtobuf from './lib/Message_pb.js';
import connectionProtobuf from './lib/Connection_pb.js';
import msgProtobuf from './lib/Msg_pb.js';
import packetTypeProtobuf from './lib/PacketType_pb.js';
import {imConfig, IMConfig} from './im.config';
// export const proto = require('./lib/Message_pb');
// export const connection = require('./lib/Connection_pb');
// export const msg = require('./lib/Msg_pb');
// export const packetType = require('./lib/PacketType_pb');
// export const team = require('./lib/Team_pb');


@Injectable({
  providedIn: 'root'
})
export class ProtocolService {

  private readonly magic: number;
  private readonly version: number;

  constructor(@Inject(imConfig) private config: IMConfig) {

    this.magic = config.magic;
    this.version = config.version;
    console.log('=================');
  }

  test() {
    console.log('tset');
    const message = new MessageProtobuf.Message();
    message.setMagic(1);
    console.log(message.getMagic());
  }


  public messageEncoder(data: any, packetTypeModel: PacketType): Uint8Array {
    const message = new MessageProtobuf.Message();
    message.setMagic(this.magic);
    message.setVersion(this.version);
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
    return MessageProtobuf.Message.deserialize(data);
  }

}
