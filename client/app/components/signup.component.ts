import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { NgForm }    from '@angular/common';
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
    
    onSubmit() {
        this._signUpService.signUp(this.player.name);
    }
    
    private setUpPlayer(playerid: string) {
        this._playerService.setPlayer(playerid, this.player.name);
        this._router.navigate(['Room']);       
    }
    
    ngOnInit() {
        this.player = new Player();      
        this._signUpService.playerId$.subscribe(newPlayerId => this.setUpPlayer(newPlayerId));  
    }
}