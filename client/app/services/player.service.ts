import { Injectable } from '@angular/core'

@Injectable()
export class PlayerService {
    private _playerName: string;
    private _createdRoom: boolean;
    
    setPlayerName(name: string) {
        this._playerName = name;
    }
   
    getPlayerName() {
        return this._playerName;
    }
    
    setCreatedRoom(createdRoom) {
        this._createdRoom = createdRoom;
    }
    
    getCreatedRoom() {
        return this._createdRoom;
    }
}