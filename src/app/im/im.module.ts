import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {imConfig, IMConfig} from './im.config';
import {ProtocolService} from './protocol.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ProtocolService]
})
export class IMModule {
  public static config(config: IMConfig): ModuleWithProviders {
    return {
      ngModule: IMModule,
      providers: [{provide: imConfig, useValue: config}]
    };
  }
}
