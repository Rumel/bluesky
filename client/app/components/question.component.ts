import { Component, Input } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { OnInit } from '@angular/core';
import { TriviaService } from '../services/trivia.service';
import { Question } from '../models/question';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'question',
  templateUrl: './app/views/question.html'
})
export class QuestionComponent implements OnInit {
    question: Question;
    playerid: string;
    
    constructor(private triviaService: TriviaService, private _router: Router, private _routeParams: RouteParams, private _playerService: PlayerService) { }
    
    answerSelected(question: number, answer: string) {
        this._router.navigate(['Result', {question: question, answer: answer}]);
    }
    
    ngOnInit() {
        this.question = new Question();
        this.playerid = this._playerService.getPlayerId();
        this.triviaService.getQuestion().then(question => this.question = question);
    }
}