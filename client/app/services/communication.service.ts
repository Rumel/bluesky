import { Injectable} from '@angular/core';
import { Socket, Channel } from 'phoenix_js';

@Injectable()
export class CommunicationService {    
    roomChannel: Channel;

    constructor(private _socket: Socket) { 
        this._socket.connect();
        this.roomChannel = this._socket.channel("room:join");
        this.roomChannel.join();
    }    
}