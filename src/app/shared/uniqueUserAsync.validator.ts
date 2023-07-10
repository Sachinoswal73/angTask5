import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { HttpHandlerService } from "./httpHandler.service";
import { Observable } from "rxjs";

export class UniqueUserAsyncValidators {

    static checkUsernames( httpData : HttpHandlerService ) : AsyncValidatorFn {

        let uArray;
        let unames : any = [];

        httpData.getUsers().subscribe( ( usersArray : any ) => {
            uArray = usersArray;
            // console.log(uArray);
            uArray.forEach( ( ua : any ) => {
                    unames.push(ua.username);
            } )
            console.log(unames);
        } )

        // console.log(uArray);

        return ( iVal : AbstractControl ) : Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            return new Promise( ( resolve ) => {
               
                    if ( unames.includes(iVal.value) ) {
                        // console.log('in promise');
                        resolve({alreadyExists : true});
                    }
                    else {
                        resolve(null);
                    }
                
            } )
        }
    }

}
