import { Injectable } from '@angular/core'

@Injectable()
export class PlayerService {
    private _playerId: string

    // Service message commands
    setPlayerId(id: string) {
        this._playerId = id;
    }
    
    getPlayerId() {
        return this._playerId;
    }
}