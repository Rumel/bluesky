import { Injectable , OnInit} from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { Socket } from 'phoenix_js';
import { Question } from '../models/question';
import { Answer } from '../models/answer';

@Injectable()
export class TriviaService {
    
    question$: Observable<Question>;
    private _questionObserver: Observer<Question>;
    private _question: Question;
    
    constructor(private _socket: Socket) { 
        this.question$ = new Observable<Question>(observer =>  this._questionObserver = observer).share();        
    }
    
    getQuestions() {
        this._socket.connect();
        
        let channel = this._socket.channel("test:lobby");
        
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
            this._question = newQuestion;
            this._questionObserver.next(this._question);
        });
        
        channel.onError(e => console.log('error', e));
        channel.onClose(c => console.log('closed'));
        channel.join();
        console.log('joined channel from service');
    }
    
    submitAnswer(question: number, answer: string) {
        console.log('Submitted ' + answer + ' for question ' + question);
    }
}