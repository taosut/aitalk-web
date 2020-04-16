import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IMConfig} from './im.config';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class IMModule {
  public static config(imConfig: IMConfig): ModuleWithProviders {
    return {
      ngModule: IMModule,
      providers: [{provide: IMConfig.CONFIG, useValue: imConfig}]
    };
  }
}
