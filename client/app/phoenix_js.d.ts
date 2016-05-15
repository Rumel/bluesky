declare module "phoenix_js" {
  class Socket {
    constructor(endPoint: any, opts: any) 
    connect(): void;
    disconnect(callback: any, code: any, reason: any): void;
  }
}