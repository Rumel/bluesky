
import { Component } from '@angular/core';
import { SignUpComponent } from './signup.component';
import { QuestionComponent } from './question.component';
import { RoomComponent } from './room.component';
import { TriviaService } from '../services/trivia.service';
import { PlayerService } from '../services/player.service';
import { CommunicationService } from '../services/communication.service';
import { RoomService } from '../services/room.service';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

@Component({
  selector: 'content',
  templateUrl: './app/views/app.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, TriviaService, CommunicationService, RoomService, PlayerService]
})
@RouteConfig([
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpComponent, 
    useAsDefault: true
  },
  {
    path: '/question/',
    name: 'Question',
    component: QuestionComponent
  },
  {
    path: '/room/',
    name: 'Room',
    component: RoomComponent
  }
])

export class AppComponent {
    constructor(private triviaService: TriviaService) { }
 }