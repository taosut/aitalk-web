import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebSocketService} from './web-socket.service';
import {webSocketConfiguration, WebSocketConfig} from './web-socket.config';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [WebSocketService]
})
export class WebSocketModule {
  public static config(config: WebSocketConfig): ModuleWithProviders {
    return {
      ngModule: WebSocketModule,
      providers: [{provide: webSocketConfiguration, useValue: config}]
    };
  }

}
