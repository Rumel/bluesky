import { Component, Input, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { TriviaService } from '../services/trivia.service';
import { PlayerService } from '../services/player.service';
import { RoomService } from '../services/room.service';
import { Question } from '../models/question';
import { Leaderboard } from '../models/leaderboard';
import { Answer } from '../models/answer';
import { Player } from '../models/player';

@Component({
  selector: 'question',
  templateUrl: './app/views/question.html'
})
export class QuestionComponent implements OnInit {
    question: Question;
    leaderboard: Leaderboard;
    playerName: string;    
    selectedAnswerToDisplay: string;
    isQuestionAnswered: boolean;
    remainingSeconds: number;
    isGameOver: boolean;
    createdRoom: boolean;
    players: Array<Player>;
    isGuessCorrect: boolean;
    showGuessStatus: boolean;
           
    private _countdownTimer: any;
    
    constructor(private _router: Router, private _routeParams: RouteParams, private _triviaService: TriviaService, private _playerService: PlayerService, private _roomService: RoomService) { }
    
    startGame() {
        this._triviaService.startGame();
    }
    
    answerSelected(question: number, selector: string) {          
        // Hide guess status.
        this.showGuessStatus = false;
        
        // Set the selected answer.
        let selectedAnswer = this.question.answers.find(x => x.selector === selector);
        this.selectedAnswerToDisplay = selectedAnswer.selector + ". " + selectedAnswer.text;        
        this.isQuestionAnswered = true;
        
        // Push up the answer to the server.
        this._triviaService.submitAnswer(question, selector);        
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
    
    private addPlayersToList(players) {  
        // As players join the room, append them to the list.
        for(var x = 0; x < players.length; x++) {
            this.players.push(players[x]);
        }                                                 
    }
    
    private guessStatus(guess: any) {        
        // Show whether the guess is correct or incorrect.
        this.isGuessCorrect = guess.correct; 
        this.showGuessStatus = true;       
    }
    
    ngOnInit() {
        this.question = new Question();
        this.question.answers = new Array<Answer>();  
        this.players = new Array<Player>();      
        this.playerName = this._playerService.getPlayerName()
        this.remainingSeconds = 30;
        this.isQuestionAnswered = false;
        this.isGameOver = false;
        this.createdRoom = this._playerService.getCreatedRoom();

        // Subscribe to the observables.
        this._triviaService.question$.subscribe(nextQuestion => this.handleNextQuestion(nextQuestion));
        this._triviaService.leaderboard$.subscribe(leaderboardResult => this.leaderboard = leaderboardResult);
        this._triviaService.gameover$.subscribe(go => this.isGameOver = true);
        this._roomService.players$.subscribe(players => this.addPlayersToList(players));
        this._triviaService.guess$.subscribe(guess => this.guessStatus(guess));
        
        // Initiate the subscriptions.
        this._triviaService.getQuestions();        
        this._roomService.getPlayers();                
    }
}