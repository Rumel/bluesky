import { Injectable } from '@angular/core';
import { QUESTION } from './mock-questions';

@Injectable()
export class TriviaService {
    getQuestion() {
        return Promise.resolve(QUESTION);
    }
}