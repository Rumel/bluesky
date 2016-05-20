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
var router_deprecated_1 = require('@angular/router-deprecated');
var trivia_service_1 = require('../services/trivia.service');
var question_1 = require('../models/question');
var player_service_1 = require('../services/player.service');
var QuestionComponent = (function () {
    function QuestionComponent(triviaService, _router, _routeParams, _playerService) {
        this.triviaService = triviaService;
        this._router = _router;
        this._routeParams = _routeParams;
        this._playerService = _playerService;
    }
    QuestionComponent.prototype.answerSelected = function (question, selector) {
        var selectedAnswer = this.question.answers.find(function (x) { return x.selector === selector; });
        this.selectedAnswerToDisplay = selectedAnswer.selector + ". " + selectedAnswer.text;
        this.isQuestionAnswered = true;
        this.triviaService.submitAnswer(question, selector);
    };
    QuestionComponent.prototype.handleNextQuestion = function (nextQuestion) {
        var _this = this;
        clearInterval(this._countdownTimer);
        this.question = nextQuestion;
        this.remainingSeconds = 30;
        this.isQuestionAnswered = false;
        this._countdownTimer = setInterval(function () { return _this.remainingSeconds--; }, 1000);
    };
    QuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.question = new question_1.Question();
        this.question.answers = new Array();
        this.playerid = this._playerService.getPlayerId();
        this.remainingSeconds = 30;
        this.isQuestionAnswered = false;
        this.triviaService.question$.subscribe(function (nextQuestion) { return _this.handleNextQuestion(nextQuestion); });
        this.triviaService.getQuestions();
    };
    QuestionComponent = __decorate([
        core_1.Component({
            selector: 'question',
            templateUrl: './app/views/question.html'
        }), 
        __metadata('design:paramtypes', [trivia_service_1.TriviaService, router_deprecated_1.Router, router_deprecated_1.RouteParams, player_service_1.PlayerService])
    ], QuestionComponent);
    return QuestionComponent;
}());
exports.QuestionComponent = QuestionComponent;
//# sourceMappingURL=question.component.js.map