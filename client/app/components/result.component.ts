import { Component, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { TriviaService } from '../services/trivia.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';

@Component({
  selector: 'result',
  templateUrl: './app/views/result.html'
})
export class ResultComponent implements OnInit {
    result: Question;
    
    constructor(private _router: Router,
                private _routeParams: RouteParams, 
                private triviaService: TriviaService) { }
    
    
    
    ngOnInit() {
                    this.result = new Question();
this.result.answers = new Array<Answer>();
        
        this.triviaService.getQuestion().then(question => {
            let questionid = this._routeParams.get('question');
            let answer = this._routeParams.get('answer');
            
            var selectedAnswer = new Answer();
            question.answers.forEach(x => {
                if(x.selector === answer) {
                  this.result.answers.push(x);
                }
            });

            this.result.answers.push(selectedAnswer);
            this.result.order = question.order;
            this.result.text = question.text;
        });
    }
}