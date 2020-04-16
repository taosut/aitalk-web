import {InjectionToken} from '@angular/core';

export interface WebSocketConfig {
  url: string;
  reconnectInterval?: number;
  reconnectAttempts?: number;
}
export const webSocketConfig: InjectionToken<string> = new InjectionToken('Websocket Configuration');

