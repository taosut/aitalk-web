import {Injectable} from '@angular/core';

import proto from './lib/protos_lib.js';

@Injectable({
  providedIn: 'root'
})
export class ProtocolService {

  constructor() {
  }

  public messageDecoder(data): Uint8Array {
    const message = new proto.Message();
    message.setPackettype(proto.PacketType.CONN_ACK);
    return message.serializeBinary();
  }

  public messageEncoder(data: Uint8Array): any {
    return proto.Message.deserialize(data);
  }

}
