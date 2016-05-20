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
var Rx_1 = require('rxjs/Rx');
var communication_service_1 = require('../services/communication.service');
var SignUpService = (function () {
    function SignUpService(_communicationService) {
        var _this = this;
        this._communicationService = _communicationService;
        this.playerId$ = new Rx_1.Observable(function (observer) { return _this._playerIdObserver = observer; }).share();
    }
    SignUpService.prototype.signUp = function (name) {
        var _this = this;
        this._communicationService.roomChannel.onError(function (e) { return console.log('Error in room channel in signup.service.', e); });
        this._communicationService.roomChannel.onClose(function (c) { return console.log('room channel closed in signup.service.'); });
        // Set up response for the new player
        this._communicationService.roomChannel.on("new_player", function (newPlayerId) {
            _this._playerId = newPlayerId;
            _this._playerIdObserver.next(_this._playerId);
        });
        this._communicationService.roomChannel.push("new_room", { "name": name });
    };
    SignUpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [communication_service_1.CommunicationService])
    ], SignUpService);
    return SignUpService;
}());
exports.SignUpService = SignUpService;
//# sourceMappingURL=signup.service.js.map