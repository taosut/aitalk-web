import {InjectionToken} from '@angular/core';

export interface IMConfig {
  magic?: number; // 魔数
  version?: number; // 版本号
}

export const imConfig: InjectionToken<string> = new InjectionToken('IM Configuration');


