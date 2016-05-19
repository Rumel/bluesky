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
var ResultComponent = (function () {
    function ResultComponent(_router, _routeParams, triviaService) {
        this._router = _router;
        this._routeParams = _routeParams;
        this.triviaService = triviaService;
    }
    ResultComponent.prototype.ngOnInit = function () {
        this.result = new question_1.Question();
        this.result.answers = new Array();
        // this.triviaService.getQuestion().then(question => {
        //     let questionid = this._routeParams.get('question');
        //     let answer = this._routeParams.get('answer');
        //     var selectedAnswer = new Answer();
        //     question.answers.forEach(x => {
        //         if(x.selector === answer) {
        //           this.result.answers.push(x);
        //         }
        //     });
        //     this.result.answers.push(selectedAnswer);
        //     this.result.order = question.order;
        //     this.result.text = question.text;
        // });
    };
    ResultComponent = __decorate([
        core_1.Component({
            selector: 'result',
            templateUrl: './app/views/result.html'
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, router_deprecated_1.RouteParams, trivia_service_1.TriviaService])
    ], ResultComponent);
    return ResultComponent;
}());
exports.ResultComponent = ResultComponent;
//# sourceMappingURL=result.component.js.map