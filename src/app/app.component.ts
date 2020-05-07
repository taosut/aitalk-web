import {Component, OnInit} from '@angular/core';
import {ProtocolService} from './im/protocol.service';
import {WebSocketService} from './web-socket/web-socket.service';
import {OpCode} from './im/model/op-code.enum';
import * as Msg_pb from './im/lib/Msg_pb.js';
import {Observable, Observer} from 'rxjs';

@Component({
  selector: 'aitalk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'aitalk-web';


  constructor(private protocolService: ProtocolService, private wsService: WebSocketService) {
  }

  send() {
    const msgData = new Msg_pb.MsgData();
    msgData.setMsgId('1');
    msgData.setToId('2');
    msgData.setContent('我她妈的居然发了一条测试信息！');
    this.wsService.send(msgData, OpCode.MSG_DATA);
  }

  ngOnInit() {
  }


}
