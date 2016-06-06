import { Injectable, OnInit } from '@angular/core';
import { CommunicationService } from '../services/communication.service';
import { PlayerService } from '../services/player.service';
import { Observable, Observer } from 'rxjs/Rx';
import { Room } from '../models/room';
import { Player } from '../models/player';

@Injectable()
export class RoomService implements OnInit {
    rooms$: Observable<Array<Room>>;
    private _roomsObserver: Observer<Array<Room>>;
    private _rooms: Array<Room>;
    room$: Observable<Room>;
    private _roomObserver: Observer<Room>;
    private _selectedRoom: Room;
    
    players$: Observable<Array<Player>>;
    private _playersObserver: Observer<Array<Player>>;
    private _players: Array<Player>;
            
    constructor(private _communicationService: CommunicationService, private _playerService: PlayerService) {
        this.rooms$ = new Observable<Array<Room>>(observer =>  this._roomsObserver = observer).share();
        this.room$ = new Observable<Room>(observer =>  this._roomObserver = observer).share(); 
        this.players$ = new Observable<Array<Player>>(observer =>  this._playersObserver = observer).share();      
        this._players = new Array<Player>();
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
        
        this._communicationService.roomChannel.on("room_added", room => { 
            var addRooms = new Array<Room>();
            addRooms.push(room);            
            this._rooms.push(room);
            this._roomsObserver.next(addRooms);       
        });         
    }
    
    createRoom(name: string) {                       
        this._communicationService.roomChannel.onError(e => console.log('Error in room channel in signup.service.', e));        
        this._communicationService.roomChannel.onClose(c => console.log('room channel closed in signup.service.', name));
        
        this._communicationService.roomChannel.push("new_room", { "name": name, "player_name": this._playerService.getPlayerName() })
            .receive("ok", room => {
                console.log("created room", room);
                this.joinRoom(room.id); 
            })
            .receive("error", (reasons) => console.log("create failed", reasons));
    }
    
    getRoomName() {
        return this._selectedRoom.name;
    }
    
    getRoomId() {
        return this._selectedRoom.id;
    }
    
    getPlayers() {        
        let that = this;
        
        this._communicationService.roomChannel.push("get_players", { }).receive("ok", function(players) {                 
            if(players != null) {
                this._players = players.players;
            }
            
            that._communicationService.roomChannel.on("new_player", player => {            
                that._players.push(player);            
                let pushArray = new Array<Player>();
                pushArray.push(player);           
                
                that._playersObserver.next(pushArray);                       
            });  
                                 
            that._playersObserver.next(this._players); 
        });      
        
       
    }
    
    ngOnInit() {
        
    }
}