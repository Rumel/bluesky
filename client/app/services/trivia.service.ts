import { Injectable , OnInit} from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { CommunicationService } from '../services/communication.service';
import { RoomService } from '../services/room.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { Leaderboard } from '../models/leaderboard';
import { LeaderboardResult } from '../models/leaderboardResult';
import { Player } from '../models/player';

@Injectable()
export class TriviaService {    
    question$: Observable<Question>;
    private _questionObserver: Observer<Question>;
    private _question: Question;
    
    gameover$: Observable<boolean>;
    private _gameoverObserver: Observer<boolean>;

    leaderboard$: Observable<Leaderboard>;
    private _leaderboardObserver: Observer<Leaderboard>;
    private _leaderboard: Leaderboard;
    
    guess$: Observable<boolean>;
    private _guessObserver: Observer<boolean>;
    
    private _players: Array<Player>;
    
    constructor(private _communicationService: CommunicationService, private _roomService: RoomService) { 
        // Set up the observables.
        this.question$ = new Observable<Question>(observer =>  this._questionObserver = observer).share();     
        this.gameover$ = new Observable<boolean>(observer => this._gameoverObserver = observer).share() ;
        this.guess$ = new Observable<boolean>(observer => this._guessObserver = observer).share();   
        this.leaderboard$ = new Observable<Leaderboard>(observer => this._leaderboardObserver = observer).share();
        this._players = new Array<Player>();  
    }
    
    startGame() {
        // Tell the server to start the game.
        this._communicationService.roomChannel.push("start_game", {});
        
       
        
        
    }
          
    getQuestions() {        
        // When a question comes in, shape the model.
        this._communicationService.roomChannel.on("new_question", msg => {
            let newQuestion = new Question();
            newQuestion.id = msg.question_id;
            newQuestion.order = msg.order;
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
            
            // Push the question down to the observable.
            this._questionObserver.next(this._question);
        });
        
        let that = this;
        
        this._communicationService.roomChannel.on("game_over", response => {   
             
            // This is a hack to marry the leaderboard with the players in order to show the name. Was quicker to do this in Angular than on the server.
            this._communicationService.roomChannel.push("get_players", { }).receive("ok", function(players) {                 
                if(players != null) {
                    that._players = players.players;
                }             
                
                let leaderboard = new Leaderboard();
                leaderboard.results = new Array<LeaderboardResult>();
                
                response.leaderboard.forEach((x) => {
                    let lr = new LeaderboardResult();
                    
                    lr.player_id = x.player_id;
                    lr.correct = x.correct;
                    
                    let player = that._players.find((p) => p.id === x.player_id);
                    
                    lr.player_name = player.name;
                    
                    leaderboard.results.push(lr);
                });

                that._leaderboard = leaderboard;            
                that._leaderboardObserver.next(that._leaderboard);
                
                // Tell the client the game is over.
                that._gameoverObserver.next(true);            
                });         
            
        });
    }
    
    submitAnswer(question: number, answer: string) {     
        // Tell the client if the guess was correct.           
        // Send the guess to the server.
        this._communicationService.roomChannel.push("new_guess", { question_id: question, guess: answer })
        .receive("ok", receivedGuess => {
            this._guessObserver.next(receivedGuess);
        })
        .receive("error", (reasons) => console.log("create failed", reasons));
    }
}