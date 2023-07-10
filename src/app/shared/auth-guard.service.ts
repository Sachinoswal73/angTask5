import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn : 'root'
})

export class AuthGuard implements CanActivate {

    constructor( private authSer : AuthService, private authRouter : Router ){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
        
        return this.authSer.isAuthenticted()
            .then( ( authenticated : any ) => {
                    if (authenticated) {
                        return true;
                    }
                    else {
                        this.authRouter.navigate(['/']);
                        return false;
                    }
            } )

    }

}