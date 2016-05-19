import { Component, Input } from '@angular/core';
import { Socket } from 'phoenix_js';
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
    
    constructor(private triviaService: TriviaService, private _router: Router, private _routeParams: RouteParams, private _playerService: PlayerService, private _socket: Socket) { }
    
    answerSelected(question: number, answer: string) {
        this._router.navigate(['Result', {question: question, answer: answer}]);
    }
    
    ngOnInit() {
        this.question = new Question();
        this.playerid = this._playerService.getPlayerId();
        //this.triviaService.getQuestion().then(question => this.question = question);
        this._socket.connect();
        
        let channel = this._socket.channel("test:lobby");
        
        // channel.on("new_msg", msg => this.player.name = msg.body);
        channel.on("new_msg", msg => console.log('received ', msg));
        channel.on("new_question", msg => {
            let newQuestion = new Question();
            newQuestion.id = 1;
            newQuestion.order = 1;
            newQuestion.text = msg.question;
            
            let answers = new Array<Answer>();
            
            let answerA = new Answer();
            answerA.selector = "A";
            answerA.text = msg.a;                        
            answers.push(answerA);
            
            let answerB = new Answer();
            answerB.selector = "B";
            answerB.text = msg.b;                        
            answers.push(answerB);
            
            let answerC = new Answer();
            answerC.selector = "C";
            answerC.text = msg.c;                        
            answers.push(answerC);
            
            let answerD = new Answer();
            answerD.selector = "D";
            answerD.text = msg.d;                        
            answers.push(answerD);
            
            newQuestion.answers = answers;
            this.question = newQuestion;
        });
        
        channel.onError(e => console.log('error', e));
        channel.onClose(c => console.log('closed'));
        channel.join();
        console.log('joined channel');
        channel.push("new_msg", {body: 'testbob'});          
        
        
    }
}