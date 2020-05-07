import {Inject, Injectable} from '@angular/core';
import {OpCode} from './model/op-code.enum';
import * as Message_pb from './lib/Message_pb.js';
import * as Connection_pb from './lib/Connection_pb.js';
import * as Msg_pb from './lib/Msg_pb.js';
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


  public messageEncoder(payload: any, opCode: OpCode): Uint8Array {
    const message = new Message_pb.Message();
    message.setMagic(this.magic);
    message.setVersion(this.version);
    message.setSeq(1);
    message.setPayloadlength(payload.serializeBinary().length);
    switch (opCode) {
      case OpCode.AUTH:
        message.setOpcode(OpCode.AUTH.valueOf());
        message.setAuth(payload);
        break;
      case OpCode.AUTH_ACK:
        debugger;
        message.setOpcode(OpCode.AUTH_ACK.valueOf());
        message.setAuthAck(payload);
        break;
      case OpCode.PING:
        break;
      case OpCode.PONG:
        break;
      case OpCode.DISCONNECT:
        break;
      case OpCode.MSG_DATA:
        message.setOpcode(OpCode.MSG_DATA.valueOf());
        message.setMsgData(payload);
        break;
      case OpCode.MSG_DATA_ACK:
        break;
      case OpCode.CREATE_TEAM_REQ:
        break;
      case OpCode.DISMISS_TEAM_REQ:
        break;
      case OpCode.QUERY_MEMBER_LIST_REQ:
        break;
    }
    return message.serializeBinary();
  }

  public messageDecoder(data: Uint8Array): Message_pb.Message {
    return Message_pb.Message.deserializeBinary(data);
  }

}
