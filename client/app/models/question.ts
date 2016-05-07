import { Answer } from './answer';

export class Question {
    id: number;
    order: number;
    text: string;
    answers: Answer[];
}