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
var phoenix_js_1 = require('phoenix_js');
var router_deprecated_1 = require('@angular/router-deprecated');
var trivia_service_1 = require('../services/trivia.service');
var question_1 = require('../models/question');
var answer_1 = require('../models/answer');
var player_service_1 = require('../services/player.service');
var QuestionComponent = (function () {
    function QuestionComponent(triviaService, _router, _routeParams, _playerService, _socket) {
        this.triviaService = triviaService;
        this._router = _router;
        this._routeParams = _routeParams;
        this._playerService = _playerService;
        this._socket = _socket;
    }
    QuestionComponent.prototype.answerSelected = function (question, answer) {
        this._router.navigate(['Result', { question: question, answer: answer }]);
    };
    QuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.question = new question_1.Question();
        this.playerid = this._playerService.getPlayerId();
        //this.triviaService.getQuestion().then(question => this.question = question);
        this._socket.connect();
        var channel = this._socket.channel("test:lobby");
        // channel.on("new_msg", msg => this.player.name = msg.body);
        channel.on("new_msg", function (msg) { return console.log('received ', msg); });
        channel.on("new_question", function (msg) {
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
            _this.question = newQuestion;
        });
        channel.onError(function (e) { return console.log('error', e); });
        channel.onClose(function (c) { return console.log('closed'); });
        channel.join();
        console.log('joined channel');
        channel.push("new_msg", { body: 'testbob' });
    };
    QuestionComponent = __decorate([
        core_1.Component({
            selector: 'question',
            templateUrl: './app/views/question.html'
        }), 
        __metadata('design:paramtypes', [trivia_service_1.TriviaService, router_deprecated_1.Router, router_deprecated_1.RouteParams, player_service_1.PlayerService, phoenix_js_1.Socket])
    ], QuestionComponent);
    return QuestionComponent;
}());
exports.QuestionComponent = QuestionComponent;
//# sourceMappingURL=question.component.js.map