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
var player_1 = require('./player');
var router_deprecated_1 = require('@angular/router-deprecated');
var SignUpComponent = (function () {
    function SignUpComponent(_router) {
        this._router = _router;
    }
    SignUpComponent.prototype.letsPlay = function () {
        this._router.navigate(['Question']);
    };
    SignUpComponent.prototype.ngOnInit = function () {
        this.player = new player_1.Player();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', player_1.Player)
    ], SignUpComponent.prototype, "player", void 0);
    SignUpComponent = __decorate([
        core_1.Component({
            selector: 'signup',
            templateUrl: './app/signup.html'
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=signup.component.js.map