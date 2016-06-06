import { Injectable} from '@angular/core';
import { Socket, Channel } from 'phoenix_js';

@Injectable()
export class CommunicationService {    
    roomChannel: Channel;

    constructor(private _socket: Socket) {        
        // Join the rooms lobby to allow the player to create or join a game. 
        this._socket.connect();
        this.roomChannel = this._socket.channel("room:lobby", {});
        this.roomChannel.join();
    }    
    
    changeRoomChannel(id: any, name: any) {
        // Once a game has been created or selected, leave the lobby and join the room.
        this.roomChannel = this._socket.channel("room:" + id, { name: name });
        this.roomChannel.join();
    }
}