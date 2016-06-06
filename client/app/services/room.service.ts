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
        // Switch from the lobby to a specific room.
        this._communicationService.changeRoomChannel(room, this._playerService.getPlayerName());
        this._selectedRoom = room;
        
        // Tell the subscribers the room has changed.
        this._roomObserver.next(this._selectedRoom);  
    } 
                
    getRoomList() {                       
        // Get all of the rooms already created.
        let that = this;              
        this._communicationService.roomChannel.push("get_rooms", { }).receive("ok", function (rooms_resp) {            
            that._rooms = rooms_resp.rooms;
            that._roomsObserver.next(that._rooms);       
        });   
        
        // If the user remains on the rooms page, append any rooms as they are created.
        this._communicationService.roomChannel.on("room_added", room => { 
            var addRooms = new Array<Room>();
            addRooms.push(room);            
            this._rooms.push(room);
            this._roomsObserver.next(addRooms);       
        });         
    }
    
    createRoom(name: string) {                       
        // Create the room.        
        this._communicationService.roomChannel.push("new_room", { "name": name, "player_name": this._playerService.getPlayerName() })
            .receive("ok", room => {                
                this.joinRoom(room.id); 
            });            
    }
    
    getRoomName() {
        return this._selectedRoom.name;
    }
    
    getRoomId() {
        return this._selectedRoom.id;
    }
    
    getPlayers() {        
        let that = this;
        
        // Get the current rooms.
        this._communicationService.roomChannel.push("get_players", { }).receive("ok", function(players) {                 
            if(players != null) {
                this._players = players.players;
            }
            
            // As any rooms are added, append them to the list. Inside of here because of the reuse of the event in Elixir code.
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