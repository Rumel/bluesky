import { Component, OnInit, Input } from '@angular/core';
import { NgForm }    from '@angular/common';
import { Router } from '@angular/router-deprecated';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'room',
  templateUrl: './app/views/room.html'
})
export class RoomComponent implements OnInit {
    @Input()
    roomInput: Room;
    
    roomlist: Array<Room>;
               
    constructor(private _router: Router, private _roomService: RoomService, private _playerService: PlayerService) {}
    
    private setRoomList(roomList) {      
      // As rooms are added to the observable, add them to the list.      
      roomList.forEach((x) => {
        let roomToAdd = new Room();           
        roomToAdd.id = x.id;    
        roomToAdd.name = x.name;        
        this.roomlist.push(roomToAdd);
      });            
    }
    
    joinRoom(room: any) {
      // Subscribe to the observable, and navigate to the Question component once the server confirms the room selection.
      this._roomService.room$.subscribe((selectedRoom) => {
        this.roomInput = selectedRoom;
        this._router.navigate(['Question']);
      });
      
      this._playerService.setCreatedRoom(false);
      this._roomService.joinRoom(room);             
    } 
    
    createRoom() {
      // Subscribe to the observable, and navigate to the Question component once the server confirms the room selection.
      this._roomService.room$.subscribe((selectedRoom) => {
        this.roomInput = selectedRoom;
        this._router.navigate(['Question']);
      });
      
      this._playerService.setCreatedRoom(true);
      this._roomService.createRoom(this.roomInput.name);
    }
            
    ngOnInit() {
       this.roomInput = new Room();
       this.roomlist = new Array<Room>();
       
       this._roomService.rooms$.subscribe(roomList => this.setRoomList(roomList));         
       this._roomService.getRoomList();
    }
}