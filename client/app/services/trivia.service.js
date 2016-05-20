"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var communication_service_1 = require('../services/communication.service');
var question_1 = require('../models/question');
var answer_1 = require('../models/answer');
var TriviaService = (function () {
    function TriviaService(_communicationService) {
        var _this = this;
        this._communicationService = _communicationService;
        this.question$ = new Rx_1.Observable(function (observer) { return _this._questionObserver = observer; }).share();
    }
    TriviaService.prototype.getQuestions = function () {
        var _this = this;
        this._communicationService.roomChannel.on("new_question", function (msg) {
            var newQuestion = new question_1.Question();
            newQuestion.id = 1;
            newQuestion.order = 1;
            newQuestion.text = msg.question;
            var answers = new Array();
            var answerA = new answer_1.Answer();
            answerA.selector = "A";
            answerA.text = msg.a;
            answers.push(answerA);
            var answerB = new answer_1.Answer();
            answerB.selector = "B";
            answerB.text = msg.b;
            answers.push(answerB);
            var answerC = new answer_1.Answer();
            answerC.selector = "C";
            answerC.text = msg.c;
            answers.push(answerC);
            var answerD = new answer_1.Answer();
            answerD.selector = "D";
            answerD.text = msg.d;
            answers.push(answerD);
            newQuestion.answers = answers;
            _this._question = newQuestion;
            _this._questionObserver.next(_this._question);
        });
        this._communicationService.roomChannel.onError(function (e) { return console.log('error', e); });
        this._communicationService.roomChannel.onClose(function (c) { return console.log('closed'); });
    };
    TriviaService.prototype.submitAnswer = function (question, answer) {
        this._communicationService.roomChannel.on("guessed", function (receivedGuess) {
            console.log('Received ' + receivedGuess.guess_guess + ' for question ' + receivedGuess.guess_id);
        });
        this._communicationService.roomChannel.push("new_guess", { question_id: question, guess: answer })
            .receive("ok", function (msg) { return console.log("created message", msg); })
            .receive("error", function (reasons) { return console.log("create failed", reasons); });
        console.log('Submitted ' + answer + ' for question ' + question);
    };
    TriviaService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [communication_service_1.CommunicationService])
    ], TriviaService);
    return TriviaService;
}());
exports.TriviaService = TriviaService;
//# sourceMappingURL=trivia.service.js.map