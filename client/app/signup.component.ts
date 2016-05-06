import { Component, Input } from '@angular/core';
import { Player } from './player';

@Component({
  selector: 'signup',
  templateUrl: './app/signup.html'
})
export class SignUpComponent {
    player: Player;
}