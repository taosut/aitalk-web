import {WebSocketConfig} from '../app/web-socket/web-socket.config';
import {IMConfig} from '../app/im/im.config';

export const environment = {
  production: true,
  apiUrl: '',
  ws: {url: 'ws://localhost:9666/ws'} as WebSocketConfig,
  im: {
    magic: 0xCAFEBABE, // 魔数
    version: 1 // 版本号
  } as IMConfig
};
