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
var communication_service_1 = require('../services/communication.service');
var Rx_1 = require('rxjs/Rx');
var RoomService = (function () {
    function RoomService(_communicationService) {
        var _this = this;
        this._communicationService = _communicationService;
        this.rooms$ = new Rx_1.Observable(function (observer) { return _this._roomsObserver = observer; }).share();
    }
    RoomService.prototype.joinRoom = function (room) {
        console.log('Joined room', room);
    };
    RoomService.prototype.getRoomList = function () {
        this._communicationService.roomChannel.onError(function (e) { return console.log('Error in room channel in signup.service.', e); });
        this._communicationService.roomChannel.onClose(function (c) { return console.log('room channel closed in signup.service.'); });
        var that = this;
        this._communicationService.roomChannel.push("get_rooms", {}).receive("ok", function (rooms_resp) {
            console.log('Room service ', rooms_resp.rooms);
            that._rooms = rooms_resp.rooms;
            that._roomsObserver.next(that._rooms);
        });
    };
    RoomService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [communication_service_1.CommunicationService])
    ], RoomService);
    return RoomService;
}());
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map