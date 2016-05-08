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
var signup_component_1 = require('./signup.component');
var question_component_1 = require('./question.component');
var result_component_1 = require('./result.component');
var trivia_service_1 = require('../services/trivia.service');
var router_deprecated_1 = require('@angular/router-deprecated');
var AppComponent = (function () {
    function AppComponent(triviaService) {
        this.triviaService = triviaService;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'content',
            templateUrl: './app/views/app.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [router_deprecated_1.ROUTER_PROVIDERS, trivia_service_1.TriviaService]
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/signup',
                name: 'SignUp',
                component: signup_component_1.SignUpComponent
            },
            {
                path: '/question',
                name: 'Question',
                component: question_component_1.QuestionComponent
            },
            {
                path: '/result/:question/:answer',
                name: 'Result',
                component: result_component_1.ResultComponent
            }
        ]), 
        __metadata('design:paramtypes', [trivia_service_1.TriviaService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map