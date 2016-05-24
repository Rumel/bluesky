
import { Component } from '@angular/core';
import { SignUpComponent } from './signup.component';
import { QuestionComponent } from './question.component';
import { RoomComponent } from './room.component';
import { ResultComponent } from './result.component';
import { TriviaService } from '../services/trivia.service';
import { SignUpService } from '../services/signup.service';
import { PlayerService } from '../services/player.service';
import { CommunicationService } from '../services/communication.service';
import { RoomService } from '../services/room.service';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

@Component({
  selector: 'content',
  templateUrl: './app/views/app.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, TriviaService, SignUpService, PlayerService, CommunicationService, RoomService]
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
  },
  {
    path: '/result/:question/:answer',
    name: 'Result',
    component: ResultComponent
  }
])

export class AppComponent {
    constructor(private triviaService: TriviaService, private signUpService: SignUpService) { }
 }