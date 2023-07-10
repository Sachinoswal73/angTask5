import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})

export class AuthService {

    loggedIn = false;

    isAuthenticted(){
        const promise = new Promise( ( resolve,reject ) => {
                setTimeout( () => {
                    resolve(this.loggedIn);
                }, 700 )
        } );
        return promise;
    }

    login(){
        this.loggedIn = true;
    }

    logout(){
        this.loggedIn = false;
    }

}