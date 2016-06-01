import { Injectable } from '@angular/core'

@Injectable()
export class PlayerService {
    private _playerName: string;
    
    setPlayerName(name: string) {
        this._playerName = name;
    }
   
    getPlayerName() {
        return this._playerName;
    }
}