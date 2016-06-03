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
    playerName: string;    
    selectedAnswerToDisplay: string;
    isQuestionAnswered: boolean;
    remainingSeconds: number;
    isGameOver: boolean;
           
    private _countdownTimer: any;
    
    constructor(private triviaService: TriviaService, private _router: Router, private _routeParams: RouteParams, private _playerService: PlayerService) { }
    
    answerSelected(question: number, selector: string) {        
        let selectedAnswer = this.question.answers.find(x => x.selector === selector);
        this.selectedAnswerToDisplay = selectedAnswer.selector + ". " + selectedAnswer.text;        
        this.isQuestionAnswered = true;
        
        this.triviaService.submitAnswer(question, selector);        
    }
    
    private handleNextQuestion(nextQuestion: Question) {
        // Reset the countdown.
        clearInterval(this._countdownTimer);
        this.remainingSeconds = 30;
                
        this.question = nextQuestion;
        
        // Switch back to the question view.
        this.isQuestionAnswered = false;
        
        // Kick off the countdown.
        this._countdownTimer = setInterval(() => this.remainingSeconds--, 1000);             
    }
    
    ngOnInit() {
        this.question = new Question();
        this.question.answers = new Array<Answer>();        
        this.playerName = this._playerService.getPlayerName()
        this.remainingSeconds = 30;
        this.isQuestionAnswered = false;
        this.isGameOver = false;

        // Subscribe to the observable.
        this.triviaService.question$.subscribe(nextQuestion => this.handleNextQuestion(nextQuestion));
        this.triviaService.gameover$.subscribe(go => this.isGameOver = true);
        
        // Initiate the subscription.
        this.triviaService.getQuestions();                        
    }
}