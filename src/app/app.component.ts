import {Component, OnInit} from '@angular/core';
import {ProtocolService} from './im/protocol.service';
import {WebSocketService} from './web-socket/web-socket.service';
import {PacketType} from './im/model/packet-type.enum';
import * as Connection_pb from './im/lib/Connection_pb';
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
    const connect = new Connection_pb.Connect();
    connect.setClientVersion('1');
    connect.setDeviceId('1');
    connect.setToken('1');
    connect.setUserId(1);
    this.wsService.send(connect, PacketType.CONNECT);
  }

  ngOnInit() {
  }


}
