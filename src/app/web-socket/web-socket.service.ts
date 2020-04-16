import {Inject, Injectable, OnDestroy} from '@angular/core';
import {WebSocketSubject, WebSocketSubjectConfig} from 'rxjs/internal-compatibility';
import {interval, Observable, Observer, Subject, SubscriptionLike} from 'rxjs';
import {WebSocketConfig, webSocketConfig} from './web-socket.config';
import {distinctUntilChanged, filter, map, share, takeWhile} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private config: WebSocketSubjectConfig<any>;
  private websocketSub: SubscriptionLike;
  private statusSub: SubscriptionLike;
  private reconnection$: Observable<number>;
  private websocket$: WebSocketSubject<any>;
  private connection$: Observer<boolean>;
  private wsMessages$: Subject<any>;
  private reconnectInterval: number; // 重连时间间隔
  private reconnectAttempts: number; // 重连次数
  private isConnected: boolean;

  public status: Observable<boolean>;

  constructor(@Inject(webSocketConfig) private wsConfig: WebSocketConfig) {
    this.wsMessages$ = new Subject<any>();

    this.reconnectInterval = wsConfig.reconnectInterval || 5000; // pause between connections
    this.reconnectAttempts = wsConfig.reconnectAttempts || 10; // number of connection attempts

    this.config = {
      url: wsConfig.url,
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

    // connection status
    this.status = new Observable<boolean>((observer) => {
      this.connection$ = observer;
    }).pipe(share(), distinctUntilChanged());

    // run reconnect if not connection
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

  /*
     * connect to WebSocked
     * */
  private connect(): void {
    this.websocket$ = new WebSocketSubject(this.config);

    this.websocket$.subscribe(
      (message) => this.wsMessages$.next(message),
      (error: Event) => {
        if (!this.websocket$) {
          // run reconnect if errors
          this.reconnect();
        }
      });
  }


  /*
  * reconnect if not connecting or errors
  * */
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


  /*
  * on message event
  * */
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
