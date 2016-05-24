"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var room_1 = require('../models/room');
var room_service_1 = require('../services/room.service');
var RoomComponent = (function () {
    function RoomComponent(_router, _roomService) {
        this._router = _router;
        this._roomService = _roomService;
    }
    RoomComponent.prototype.setRoomList = function (roomList) {
        var _this = this;
        console.log('Room comp', roomList);
        roomList.forEach(function (x) {
            var room = new room_1.Room();
            room.name = x;
            _this.roomlist.push(room);
        });
    };
    RoomComponent.prototype.joinRoom = function (room) {
        this._roomService.joinRoom(room);
        this._router.navigate(['Question']);
    };
    RoomComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.roomlist = new Array();
        this._roomService.rooms$.subscribe(function (roomList) { return _this.setRoomList(roomList); });
        this._roomService.getRoomList();
    };
    RoomComponent = __decorate([
        core_1.Component({
            selector: 'room',
            templateUrl: './app/views/room.html'
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, room_service_1.RoomService])
    ], RoomComponent);
    return RoomComponent;
}());
exports.RoomComponent = RoomComponent;
//# sourceMappingURL=room.component.js.map