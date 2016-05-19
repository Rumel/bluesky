declare module "phoenix_js" {
  class Socket {
    constructor(endPoint: any, opts: any) 
    connect(): void;
    disconnect(callback: any, code: any, reason: any): void;
    //channel(topic: any, params: any, socket: any): void;
    channel(topic: any): Channel;
  }
  
  class Channel {
    constructor(topic: any, params: any, socket: any);
    join(): void;
    onClose(callback: any): void;
    onError(callback: any): void;
    on(event: any, callback: any): void;
    onMessage(event: any, payload: any, ref: any): void;
    push(event: any, payload: any): void;
  }
}