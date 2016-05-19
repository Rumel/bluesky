import { Injectable } from '@angular/core';
import { Socket } from 'phoenix_js';

@Injectable()
export class SignUpService {
    constructor(private _socket: Socket) { }
    
    private mockSignUp() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    
    private callSignUpService(name: string) {
        
    }
    
    signUp(name: string) {
        return Promise.resolve(this.mockSignUp());
        
        // TODO: Need to connect to the socket and get the player id.
    }
}