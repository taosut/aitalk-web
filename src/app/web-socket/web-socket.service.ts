import {Inject, Injectable, OnDestroy} from '@angular/core';
import {WebSocketSubject, WebSocketSubjectConfig} from 'rxjs/internal-compatibility';
import {interval, Observable, Observer, Subject, SubscriptionLike} from 'rxjs';
import {WebSocketConfig, webSocketConfiguration} from './web-socket.config';
import {distinctUntilChanged, filter, map, share, takeWhile} from 'rxjs/operators';
import {IMConfig, imConfiguration} from '../im/im.config';
import {ProtocolService} from '../im/protocol.service';
import {OpCode} from '../im/model/op-code.enum';
import * as Connection_pb from '../im/lib/Connection_pb.js';
import * as Message_pb from '../im/lib/Message_pb.js';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private readonly webSocketSubjectConfig: WebSocketSubjectConfig<any>; // websocket配置
  private readonly reconnectInterval: number; // 重连时间间隔
  private readonly reconnectAttempts: number; // 重连次数
  private websocketSub: SubscriptionLike;
  private statusSub: SubscriptionLike;
  private reconnection$: Observable<number>;
  private websocket$: WebSocketSubject<any>;
  private connection$: Observer<boolean>;
  private wsMessages$: Subject<Message_pb.Message>;

  private isConnected: boolean;

  public status: Observable<boolean>;

  constructor(@Inject(webSocketConfiguration) private wbConfig: WebSocketConfig,
              @Inject(imConfiguration) private imConfig: IMConfig, private protocolService: ProtocolService) {
    this.wsMessages$ = new Subject<any>();
    this.reconnectInterval = wbConfig.reconnectInterval || 5000; // 重连时间间隔
    this.reconnectAttempts = wbConfig.reconnectAttempts || 10; // 重连次数
    // 初始化websocket配置信息
    this.webSocketSubjectConfig = {
      url: wbConfig.url,
      serializer: (value: any) => value,
      deserializer: (e: MessageEvent) => protocolService.messageDecoder(e.data),
      binaryType: 'arraybuffer',
      closeObserver: {
        next: (event: CloseEvent) => {
          console.log('==========>WebSocket closed!');
          this.websocket$ = null;
          this.connection$.next(false);
        }
      },
      openObserver: {
        next: (event: Event) => {
          console.debug('==========>WebSocket connected!');
          this.connection$.next(true);
          const auth = new Connection_pb.Auth();
          auth.setClientVersion('1');
          auth.setDeviceId('1');
          auth.setToken('1');
          auth.setUserId(1);
          this.send(auth, OpCode.AUTH);
        }
      }
    };
    // 连接状态
    this.status = new Observable<boolean>((subscriber) => {
      debugger;
      this.connection$ = subscriber;
    }).pipe(share(), distinctUntilChanged());

    // 如果没有连接成功或为连接，重新连接
    this.statusSub = this.status.subscribe((isConnected) => {
      this.isConnected = isConnected;
      if (!this.reconnection$ && typeof (isConnected) === 'boolean' && !isConnected) {
        this.reconnect();
      }
      console.log('服务器连接成功？', this.isConnected ? '是' : '否');
    });

    this.websocketSub = this.wsMessages$.subscribe({
        next: (data) => {
          debugger;
          console.log(data);
        },
        error: (error) => console.error('WebSocket error!', error)
      }
    );

    this.connect();
  }

  /**
   * 建立连接
   */
  private connect(): void {
    this.websocket$ = new WebSocketSubject(this.webSocketSubjectConfig);

    this.websocket$.subscribe(
      (message) => {
        debugger;
        this.wsMessages$.next(message);
      },
      (error: Event) => {
        if (!this.websocket$) {
          // run reconnect if errors
          this.reconnect();
        }
      });
  }


  /**
   * 重连
   */
  private reconnect(): void {
    this.reconnection$ = interval(this.reconnectInterval)
      .pipe(takeWhile((v, index) => index < this.reconnectAttempts && !this.websocket$));
    this.reconnection$.subscribe(
      {
        next: () => this.connect(),
        complete: () => {
          // Subject complete if reconnect attemts ending
          this.reconnection$ = null;
          if (!this.websocket$) {
            this.wsMessages$.complete();
            this.connection$.complete();
          }
        }
      }
    );
  }


  /**
   * 视图事件
   * @param event 事件
   */
  public on<T>(event: string): Observable<T> {
    if (event) {
      return this.wsMessages$.pipe(
        filter((message: any) => message.event === event),
        map((message: any) => message.data)
      );
    }
  }

  /**
   * 发送消息
   * @param payload 消息负载
   * @param opCode 操作码
   */
  public send(payload: any = {}, opCode: OpCode): void {
    if (!!payload && this.isConnected) {
      this.websocket$.next(this.protocolService.messageEncoder(payload, opCode));
    } else {
      console.error('Send error!');
    }
  }

  /**
   * 销毁时取消订阅
   */
  ngOnDestroy(): void {
    this.websocketSub.unsubscribe();
    this.statusSub.unsubscribe();
  }
}
