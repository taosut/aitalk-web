// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {IMConfig} from '../app/im/im.config';
import {WebSocketConfig} from '../app/web-socket/web-socket.config';

export const environment = {
  production: false,
  apiUrl: '',
  ws: {url: 'ws://localhost:9666/websocket'} as WebSocketConfig,
  im: {
    magic: 0xCAFEBABE, // 魔数
    version: 1 // 版本号
  } as IMConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
