import {PacketType} from './packet-type.enum';

export class Message {
  magic: number;  // 魔数
  version: number; // 版本号
  packetType: PacketType;
  seq: number; // 序列号
  payloadLength: number; // 负载长度


  constructor(packetType: PacketType, seq: number, payloadLength: number) {
    this.packetType = packetType;
    this.seq = seq;
    this.payloadLength = payloadLength;
  }
}
