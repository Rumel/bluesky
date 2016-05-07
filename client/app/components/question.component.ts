import { Component, Input } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { OnInit } from '@angular/core';
import { TriviaService } from '../services/trivia.service';
import { Question } from '../models/question';

@Component({
  selector: 'question',
  templateUrl: './app/views/question.html'
})
export class QuestionComponent implements OnInit {
    question: Question;
    
    constructor(private triviaService: TriviaService, private _router: Router) { }
    
    answerSelected(question: number, answer: string) {
        this._router.navigate(['Result', {question: question, answer: answer}]);
    }
    
    ngOnInit() {
        this.question = new Question();
        this.triviaService.getQuestion().then(question => this.question = question);
    }
}