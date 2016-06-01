import { Injectable } from '@angular/core';
import { CommunicationService } from '../services/communication.service';
import { PlayerService } from '../services/player.service';
import { Observable, Observer } from 'rxjs/Rx';
import { Room } from '../models/room';

@Injectable()
export class RoomService {
    rooms$: Observable<Array<Room>>;
    private _roomsObserver: Observer<Array<Room>>;
    private _rooms: Array<Room>;
    room$: Observable<Room>;
    private _roomObserver: Observer<Room>;
    private _selectedRoom: Room;
            
    constructor(private _communicationService: CommunicationService, private _playerService: PlayerService) {
        this.rooms$ = new Observable<Array<Room>>(observer =>  this._roomsObserver = observer).share();
        this.room$ = new Observable<Room>(observer =>  this._roomObserver = observer).share();      
     }
    
    joinRoom(room: any) {
        console.log('Joined room', room);
        this._communicationService.changeRoomChannel(room, this._playerService.getPlayerName());
        this._selectedRoom = room;
        this._roomObserver.next(this._selectedRoom);  
    } 
                
    getRoomList() {                       
        this._communicationService.roomChannel.onError(e => console.log('Error in room channel in signup.service.', e));        
        this._communicationService.roomChannel.onClose(c => console.log('room channel closed in signup.service.'));

        let that = this;              
        this._communicationService.roomChannel.push("get_rooms", { }).receive("ok", function (rooms_resp) {            
            that._rooms = rooms_resp.rooms;
            that._roomsObserver.next(that._rooms);       
        });            
    }
    
    createRoom(name: string) {                       
        this._communicationService.roomChannel.onError(e => console.log('Error in room channel in signup.service.', e));        
        this._communicationService.roomChannel.onClose(c => console.log('room channel closed in signup.service.', name));
            
        // Set up response for the new room
        this._communicationService.roomChannel.on("new_room", room => {             
            // this._selectedRoom = room;   
            // this._roomObserver.next(this._selectedRoom);    
            this.joinRoom(room.id);          
        });
                   
        let that = this; 
        this._communicationService.roomChannel.push("new_room", { "name": name, "player_name": this._playerService.getPlayerName() });
        // .receive("ok", function(room) {
        //     that._selectedRoom = room;
        //     that._roomObserver.next(that._selectedRoom);        
        // });
    }
    
    getRoomName() {
        return this._selectedRoom.name;
    }
    
    getRoomId() {
        return this._selectedRoom.id;
    }
}