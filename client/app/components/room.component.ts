import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'room',
  templateUrl: './app/views/room.html'
})
export class RoomComponent implements OnInit {
    roomlist: Array<Room>;
       
    constructor(private _router: Router, private _roomService: RoomService) {}
    
    private setRoomList(roomList) {
      console.log('Room comp', roomList);
      
      roomList.forEach((x) => {
        let room = new Room();
        room.name = x;
        this.roomlist.push(room);
      });            
    }
    
    joinRoom(room: any) {
      this._roomService.joinRoom(room);
      this._router.navigate(['Question']);       
    } 
            
    ngOnInit() {
       this.roomlist = new Array<Room>();
       this._roomService.rooms$.subscribe(roomList => this.setRoomList(roomList));         
       this._roomService.getRoomList();
    }
}