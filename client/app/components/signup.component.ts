import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Player } from '../models/player';
import { SignUpService } from '../services/signup.service';

@Component({
  selector: 'signup',
  templateUrl: './app/views/signup.html'
})
export class SignUpComponent implements OnInit {
    @Input()
    player: Player;
    
    constructor(private _router: Router, private _signUpService: SignUpService) {}
    
    letsPlay() {
        this._signUpService.signUp(this.player.name)
                            .then(playerid => this._router.navigate(['Question', { playerid: playerid }]));
    }
    
    ngOnInit() {
        this.player = new Player();
    }
}