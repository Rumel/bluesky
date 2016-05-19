import { Component, Input } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { OnInit } from '@angular/core';
import { TriviaService } from '../services/trivia.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'question',
  templateUrl: './app/views/question.html'
})
export class QuestionComponent implements OnInit {
    question: Question;
    playerid: string;    
    selectedAnswerToDisplay: string;
    isQuestionAnswered: boolean;
    
    constructor(private triviaService: TriviaService, private _router: Router, private _routeParams: RouteParams, private _playerService: PlayerService) { }
    
    answerSelected(question: number, selector: string) {        
        let selectedAnswer = this.question.answers.find(x => x.selector === selector);
        this.selectedAnswerToDisplay = selectedAnswer.selector + ". " + selectedAnswer.text;        
        this.isQuestionAnswered = true;
        
        this.triviaService.submitAnswer(question, selector);        
    }
    
    private handleNextQuestion(nextQuestion: Question) {
        this.question = nextQuestion;
        this.isQuestionAnswered = false;
    }
    
    ngOnInit() {
        this.question = new Question();
        this.question.answers = new Array<Answer>();
        this.playerid = this._playerService.getPlayerId();
        this.isQuestionAnswered = false;
        
        this.triviaService.question$.subscribe(nextQuestion => this.handleNextQuestion(nextQuestion));
        this.triviaService.getQuestions();                        
    }
}