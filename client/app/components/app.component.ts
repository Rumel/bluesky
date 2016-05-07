import { Component } from '@angular/core';
import { SignUpComponent } from './signup.component';
import { QuestionComponent } from './question.component';
import { ResultComponent } from './result.component';
import { TriviaService } from '../services/trivia.service';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

@Component({
  selector: 'content',
  templateUrl: './app/views/app.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, TriviaService]
})
@RouteConfig([
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpComponent
  },
  {
    path: '/question',
    name: 'Question',
    component: QuestionComponent
  },
  {
    path: '/result/:question/:answer',
    name: 'Result',
    component: ResultComponent
  }
])

export class AppComponent {
    constructor(private triviaService: TriviaService) { }
 }