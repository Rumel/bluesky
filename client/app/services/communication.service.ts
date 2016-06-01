import { Injectable} from '@angular/core';
import { Socket, Channel } from 'phoenix_js';

@Injectable()
export class CommunicationService {    
    roomChannel: Channel;

    constructor(private _socket: Socket) {         
        this._socket.connect();
        this.roomChannel = this._socket.channel("room:lobby", {});
        this.roomChannel.join();
    }    
    
    changeRoomChannel(id: any, name: any) {
        //this.roomChannel.leave();
        this.roomChannel = this._socket.channel("room:" + id, { name: name });
        this.roomChannel.join();
    }
}