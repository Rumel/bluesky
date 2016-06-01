import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { NgForm }    from '@angular/common';
import { Player } from '../models/player';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'signup',
  templateUrl: './app/views/signup.html'
})
export class SignUpComponent implements OnInit {
    @Input()
    player: Player;
    
    constructor(private _router: Router, private _playerService: PlayerService) {}
    
    onSubmit() {
        this._playerService.setPlayerName(this.player.name);
        this._router.navigate(['Room']); 
    }
           
    ngOnInit() {
        this.player = new Player();
    }
}