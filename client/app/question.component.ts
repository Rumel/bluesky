import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { TriviaService } from './trivia.service';
import { Question } from './question';

@Component({
  selector: 'question',
  templateUrl: './app/question.html'
})
export class QuestionComponent implements OnInit {
    question: Question;
    
    constructor(private triviaService: TriviaService) { }
    
    
    
    ngOnInit() {
        // this.question = new Question();
        // this.question.order = 1;
        this.triviaService.getQuestion().then(question => this.question = question);
    }
}