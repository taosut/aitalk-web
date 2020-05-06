import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WebSocketModule} from './web-socket/web-socket.module';
import {environment} from '../environments/environment';
import {IMModule} from './im/im.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebSocketModule.config(environment.ws),
    IMModule.config(environment.im)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('AiTalk web client is starting >>>>>');
  }
}
