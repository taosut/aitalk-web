import { Component } from '@angular/core';
import {ProtocolService} from './im/protocol.service';

@Component({
  selector: 'aitalk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aitalk-web';

  constructor(private protocolService: ProtocolService) {
    protocolService.test();
  }
}
