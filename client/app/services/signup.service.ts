import { Injectable } from '@angular/core';
import { Socket } from 'phoenix_js';
import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class SignUpService {
    playerId$: Observable<string>;
    private _playerIdObserver: Observer<string>;
    private _playerId: string;

    constructor(private _socket: Socket) {
        this.playerId$ = new Observable<string>(observer =>  this._playerIdObserver = observer).share();
     }
                
    signUp(name: string) {               
        this._socket.connect();
        
        let channel = this._socket.channel("room:join");
        channel.onError(e => {
            console.log('error', e)
        });
        
        channel.onClose(c => console.log('closed'));
               
        // Set up response for the new player
        channel.on("new_player", newPlayerId => {             
            this._playerId = newPlayerId;
            this._playerIdObserver.next(this._playerId);
        });
        
        channel.join();
        console.log('joined channel from service');
        
        channel.push("new_room", { "name": name });
    }
}