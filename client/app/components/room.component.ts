import { Component, OnInit, Input } from '@angular/core';
import { NgForm }    from '@angular/common';
import { Router } from '@angular/router-deprecated';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'room',
  templateUrl: './app/views/room.html'
})
export class RoomComponent implements OnInit {
    @Input()
    roomInput: Room;
    
    roomlist: Array<Room>;
    bob: string;
           
    constructor(private _router: Router, private _roomService: RoomService) {}
    
    private setRoomList(roomList) {            
      roomList.forEach((x) => {
        let roomToAdd = new Room();           
        roomToAdd.id = x.id;    
        roomToAdd.name = x.name;        
        this.roomlist.push(roomToAdd);
      });            
    }
    
    joinRoom(room: any) {
      this._roomService.room$.subscribe((selectedRoom) => {
        this.roomInput = selectedRoom;
        this._router.navigate(['Question']);
      });
      
      this._roomService.joinRoom(room);             
    } 
    
    createRoom() {
      this._roomService.room$.subscribe((selectedRoom) => {
        this.roomInput = selectedRoom;
        this._router.navigate(['Question']);
      });
            
      this._roomService.createRoom(this.roomInput.name);
    }
            
    ngOnInit() {
       this.roomInput = new Room();
       this.roomlist = new Array<Room>();
       
       this._roomService.rooms$.subscribe(roomList => this.setRoomList(roomList));         
       this._roomService.getRoomList();
    }
}