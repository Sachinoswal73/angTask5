import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class HttpHandlerService {

    apiUrl = 'https://angtask5-ae005-default-rtdb.asia-southeast1.firebasedatabase.app/users.json';

    leaveApiUrl = 'https://angtask5-ae005-default-rtdb.asia-southeast1.firebasedatabase.app/leaveApplications.json';

    constructor( public httpCl : HttpClient ){
        
    }


    usersBehaSub : BehaviorSubject<any> = new BehaviorSubject('usr loading ...');

    leavesBehaSub : BehaviorSubject<any> = new BehaviorSubject('lvs loading ...');


    getUsers(){
        
        return this.httpCl.get(this.apiUrl)
            .pipe( map( ( rawData : any ) => {
                let convArray = [];
                for ( let rd in rawData ) {
                    convArray.push( { ...rawData[rd], uid : rd } );
                }
                this.usersBehaSub.next(convArray);
                return convArray;
            } ))
    }


    onRegister(newUser : any){
        
        return this.httpCl.post(this.apiUrl, newUser);

    }


    onApplyForLeave(newLeaveApplication : any){

        return this.httpCl.post(this.leaveApiUrl, newLeaveApplication);

    }


    getLeaveApplications(){

        return this.httpCl.get(this.leaveApiUrl)
            .pipe( map( ( rawData : any ) => {
                        let convArr = [];
                        for( let rd in rawData ) {
                            convArr.push({...rawData[rd], lid : rd});
                        }
                        this.leavesBehaSub.next(convArr);
                        return convArr;
                    } 
                )
             )

    }


    onStatusUpdate( lid : any, updStatus : any ){

        let updLeaveUrl = 'https://angtask5-ae005-default-rtdb.asia-southeast1.firebasedatabase.app/leaveApplications/' + lid + '.json';

        // console.log(updLeaveUrl)

        let updSts = updStatus; 

        // console.log(updStatus);
        return this.httpCl.patch(updLeaveUrl, { status : updSts } );
    }

}