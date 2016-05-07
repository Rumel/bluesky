import { Component, Input, OnInit } from '@angular/core';
import { Player } from './player';
import { Router } from '@angular/router-deprecated';

@Component({
  selector: 'signup',
  templateUrl: './app/signup.html'
})
export class SignUpComponent implements OnInit {
    @Input()
    player: Player;
    
    constructor(private _router: Router) {}
    
    letsPlay() {
        this._router.navigate(['Question']);
    }
    
    ngOnInit() {
        this.player = new Player();
    }
}