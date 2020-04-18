import {Component, OnInit} from '@angular/core';
import {ProtocolService} from './im/protocol.service';
import {WebSocketService} from './web-socket/web-socket.service';

@Component({
  selector: 'aitalk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'aitalk-web';


  constructor(private protocolService: ProtocolService, private wsService: WebSocketService) {
    protocolService.test();
  }

  ngOnInit() {
  }


}
