import { Injectable } from '@angular/core';
import { CommunicationService } from '../services/communication.service';
import { Observable, Observer } from 'rxjs/Rx';
import { Room } from '../models/room';

@Injectable()
export class RoomService {
    rooms$: Observable<Array<Room>>;
    private _roomsObserver: Observer<Array<Room>>;
    private _rooms: Array<Room>;
    
    constructor(private _communicationService: CommunicationService) {
        this.rooms$ = new Observable<Array<Room>>(observer =>  this._roomsObserver = observer).share();      
     }
    
    joinRoom(room: any) {
        console.log('Joined room', room);
    } 
                
    getRoomList() {                       
        this._communicationService.roomChannel.onError(e => console.log('Error in room channel in signup.service.', e));        
        this._communicationService.roomChannel.onClose(c => console.log('room channel closed in signup.service.'));

        let that = this;              
        this._communicationService.roomChannel.push("get_rooms", { }).receive("ok", function (rooms_resp) {
            console.log('Room service ', rooms_resp.rooms);
            that._rooms = rooms_resp.rooms;
            that._roomsObserver.next(that._rooms);       
        });
    }
}