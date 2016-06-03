import { Injectable , OnInit} from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { CommunicationService } from '../services/communication.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';

@Injectable()
export class TriviaService {
    
    question$: Observable<Question>;
    private _questionObserver: Observer<Question>;
    private _question: Question;
    
    gameover$: Observable<boolean>;
    private _gameoverObserver: Observer<boolean>;
    
    constructor(private _communicationService: CommunicationService) { 
        this.question$ = new Observable<Question>(observer =>  this._questionObserver = observer).share();     
        this.gameover$ = new Observable<boolean>(observer => this._gameoverObserver = observer).share() ;  
    }
          
    getQuestions() {        
        this._communicationService.roomChannel.on("new_question", msg => {
            let newQuestion = new Question();
            newQuestion.id = msg.question_id;
            newQuestion.order = msg.question_id;
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
        
        this._communicationService.roomChannel.on("game_over", () => {
            console.log('Game over.');
            this._gameoverObserver.next(true);            
        });
        
        this._communicationService.roomChannel.onError(e => console.log('error', e));
        this._communicationService.roomChannel.onClose(c => console.log('closed'));
    }
    
    submitAnswer(question: number, answer: string) {                
        this._communicationService.roomChannel.on("guessed", receivedGuess => {
            console.log('Received ' + receivedGuess.guess_guess + ' for question ' + receivedGuess.guess_id);
        });
        
        this._communicationService.roomChannel.push("new_guess", { question_id: question, guess: answer })
        .receive("ok", (msg) => console.log("created message", msg))
        .receive("error", (reasons) => console.log("create failed", reasons));
        
        console.log('Submitted ' + answer + ' for question ' + question);
    }
}