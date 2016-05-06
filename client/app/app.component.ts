import { Component } from '@angular/core';
import { SignUpComponent } from './signup.component';
import { QuestionComponent } from './question.component';
import { TriviaService } from './trivia.service';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

@Component({
  selector: 'content',
  templateUrl: './app/app.html',
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
  }
])

export class AppComponent {
    constructor(private triviaService: TriviaService) { }
 }