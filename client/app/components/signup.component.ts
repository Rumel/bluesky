import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Player } from '../models/player';
import { SignUpService } from '../services/signup.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'signup',
  templateUrl: './app/views/signup.html'
})
export class SignUpComponent implements OnInit {
    @Input()
    player: Player;
    
    constructor(private _router: Router, private _signUpService: SignUpService, private _playerService: PlayerService) {}
    
    letsPlay() {
        this._signUpService.signUp(this.player.name)
                            .then(playerid => {
                                this._playerService.setPlayerId(playerid);
                                this._router.navigate(['Question']);
                            });
    }
    
    ngOnInit() {
        this.player = new Player();
    }
}