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
var phoenix_js_1 = require("phoenix_js");
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var player_1 = require('../models/player');
var signup_service_1 = require('../services/signup.service');
var player_service_1 = require('../services/player.service');
var SignUpComponent = (function () {
    function SignUpComponent(_router, _signUpService, _playerService, _socket) {
        this._router = _router;
        this._signUpService = _signUpService;
        this._playerService = _playerService;
        this._socket = _socket;
    }
    SignUpComponent.prototype.onSubmit = function () {
        var _this = this;
        this._signUpService.signUp(this.player.name)
            .then(function (playerid) {
            _this._playerService.setPlayerId(playerid);
            _this._router.navigate(['Question']);
        });
    };
    SignUpComponent.prototype.ngOnInit = function () {
        this.player = new player_1.Player();
        this._socket.connect();
        var channel = this._socket.channel("test:lobby");
        // channel.on("new_msg", msg => this.player.name = msg.body);
        channel.on("new_msg", function (msg) { return console.log('received ', msg); });
        channel.on("new_question", function (msg) { return console.log('received ', msg); });
        channel.onError(function (e) { return console.log('error', e); });
        channel.onClose(function (c) { return console.log('closed'); });
        channel.join();
        console.log('joined channel');
        channel.push("new_msg", { body: 'testbob' });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', player_1.Player)
    ], SignUpComponent.prototype, "player", void 0);
    SignUpComponent = __decorate([
        core_1.Component({
            selector: 'signup',
            templateUrl: './app/views/signup.html'
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, signup_service_1.SignUpService, player_service_1.PlayerService, phoenix_js_1.Socket])
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=signup.component.js.map