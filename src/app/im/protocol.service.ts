import {Inject, Injectable} from '@angular/core';
import {PacketType} from './model/packet-type.enum';
import * as Message_pb from './lib/Message_pb.js';
import * as Connection_pb from './lib/Connection_pb.js';
import * as Msg_pb from './lib/Msg_pb.js';
import * as PacketType_pb from './lib/PacketType_pb.js';
import {imConfiguration, IMConfig} from './im.config';


@Injectable({
  providedIn: 'root'
})
export class ProtocolService {

  private readonly magic: number;
  private readonly version: number;

  constructor(@Inject(imConfiguration) private imConfig: IMConfig) {

    this.magic = imConfig.magic;
    this.version = imConfig.version;
  }


  public messageEncoder(payload: any, packetTypeModel: PacketType): Uint8Array {
    const message = new Message_pb.Message();
    message.setMagic(this.magic);
    message.setVersion(this.version);
    message.setSeq(1);
    message.setPayloadlength(payload.serializeBinary().length);
    switch (packetTypeModel) {
      case PacketType.CONNECT:
        message.setPackettype(PacketType_pb.PacketType.CONNECT);
        message.setConnect(payload);
        break;
      case PacketType.CONN_ACK:
        debugger;
        message.setPackettype(PacketType_pb.PacketType.CONN_ACK);
        message.setConnAck(payload);
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

  public messageDecoder(data: Uint8Array): Message_pb.Message {
    return Message_pb.Message.deserializeBinary(data);
  }

}
