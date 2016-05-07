import { Component, Input, OnInit } from '@angular/core';
import { Player } from './player';

@Component({
  selector: 'signup',
  templateUrl: './app/signup.html'
})
export class SignUpComponent implements OnInit {
    @Input()
    player: Player;
    
    ngOnInit() {
        this.player = new Player();
    }
}