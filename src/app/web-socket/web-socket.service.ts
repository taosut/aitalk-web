import {Inject, Injectable, OnDestroy} from '@angular/core';
import {WebSocketSubject, WebSocketSubjectConfig} from 'rxjs/internal-compatibility';
import {interval, Observable, Observer, Subject, SubscriptionLike} from 'rxjs';
import {WebSocketConfig, webSocketConfig} from './web-socket.config';
import {distinctUntilChanged, filter, map, share, takeWhile} from 'rxjs/operators';
import MessageProtobuf from '../im/lib/Message_pb.js';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private readonly webSocketSubjectConfig: WebSocketSubjectConfig<MessageProtobuf>; // websocket配置
  private readonly reconnectInterval: number; // 重连时间间隔
  private readonly reconnectAttempts: number; // 重连次数
  private websocketSub: SubscriptionLike;
  private statusSub: SubscriptionLike;
  private reconnection$: Observable<number>;
  private websocket$: WebSocketSubject<any>;
  private connection$: Observer<boolean>;
  private wsMessages$: Subject<any>;

  private isConnected: boolean;

  public status: Observable<boolean>;

  constructor(@Inject(webSocketConfig) private config: WebSocketConfig) {
    this.wsMessages$ = new Subject<any>();
    this.reconnectInterval = config.reconnectInterval || 5000; // 重连时间间隔
    this.reconnectAttempts = config.reconnectAttempts || 10; // 重连次数
    // 初始化websocket配置信息
    this.webSocketSubjectConfig = {
      url: config.url,
      closeObserver: {
        next: (event: CloseEvent) => {
          this.websocket$ = null;
          this.connection$.next(false);
        }
      },
      openObserver: {
        next: (event: Event) => {
          console.log('WebSocket connected!');
          this.connection$.next(true);
        }
      }
    };

    // 连接状态
    this.status = new Observable<boolean>((observer) => {
      this.connection$ = observer;
    }).pipe(share(), distinctUntilChanged());

    // 如果没有连接成功或为连接，重新连接
    this.statusSub = this.status
      .subscribe((isConnected) => {
        this.isConnected = isConnected;

        if (!this.reconnection$ && typeof (isConnected) === 'boolean' && !isConnected) {
          this.reconnect();
        }
      });

    this.websocketSub = this.wsMessages$.subscribe(
      null, (error: ErrorEvent) => console.error('WebSocket error!', error)
    );

    this.connect();
  }

  /**
   * 建立连接
   */
  private connect(): void {
    console.log('==================connect');
    this.websocket$ = new WebSocketSubject(this.webSocketSubjectConfig);

    this.websocket$.subscribe(
      (message) => this.wsMessages$.next(message),
      (error: Event) => {
        if (!this.websocket$) {
          // run reconnect if errors
          console.log('==================2222');
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
      () => this.connect(),
      null,
      () => {
        // Subject complete if reconnect attemts ending
        this.reconnection$ = null;

        if (!this.websocket$) {
          this.wsMessages$.complete();
          this.connection$.complete();
        }
      });
  }


  /**
   * 消息事件
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


  /*
  * on message to server
  * */
  public send(event: string, data: any = {}): void {
    if (event && this.isConnected) {
      this.websocket$.next(JSON.stringify({event, data}));
    } else {
      console.error('Send error!');
    }
  }

  ngOnDestroy(): void {
    this.websocketSub.unsubscribe();
    this.statusSub.unsubscribe();
  }
}
