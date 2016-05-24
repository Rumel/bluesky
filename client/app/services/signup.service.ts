import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { CommunicationService } from '../services/communication.service';

@Injectable()
export class SignUpService {
    playerId$: Observable<string>;
    private _playerIdObserver: Observer<string>;
    private _playerId: string;

    constructor(private _communicationService: CommunicationService) {
        this.playerId$ = new Observable<string>(observer =>  this._playerIdObserver = observer).share();
     }
                
    signUp(name: string) {                       
        this._communicationService.roomChannel.onError(e => console.log('Error in room channel in signup.service.', e));        
        this._communicationService.roomChannel.onClose(c => console.log('room channel closed in signup.service.'));
               
        // Set up response for the new player
        this._communicationService.roomChannel.on("new_player", newPlayerId => {             
            this._playerId = newPlayerId;
            this._playerIdObserver.next(this._playerId);       
        });
                     
        this._communicationService.roomChannel.push("new_room", { "name": name, "player_name": name });
    }
}
