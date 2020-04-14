import {Message} from './message.model';
import {PacketType} from './packet-type.enum';

export class Msg extends Message {
  constructor(packetType: PacketType, seq: number, payloadLength: number) {
    super(packetType, seq, payloadLength);
  }
}
