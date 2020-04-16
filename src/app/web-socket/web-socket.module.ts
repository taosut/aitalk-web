import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {WebTestSocketConfig} from './web-test-socket.config';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class WebSocketModule {
  public static config(wsConfig: WebTestSocketConfig): ModuleWithProviders {
    return {
      ngModule: WebSocketModule,
      providers: [{ provide: WebTestSocketConfig.CONFIG, useValue: wsConfig }]
    };
  }

}
