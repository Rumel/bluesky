import { Injectable } from '@angular/core'

@Injectable()
export class PlayerService {
    private _playerId: string;
    private _playerName: string;
    
    setPlayer(id: string, name: string) {
        this._playerId = id;
        this._playerName = name;
    }
    
    getPlayerId() {
        return this._playerId;
    }
    
    getPlayerName() {
        return this._playerName;
    }
}