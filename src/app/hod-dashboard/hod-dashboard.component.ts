import { Component, OnInit } from '@angular/core';
import { HttpHandlerService } from '../shared/httpHandler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hod-dashboard',
  templateUrl: './hod-dashboard.component.html',
  styleUrls: ['./hod-dashboard.component.scss']
})

export class HodDashboardComponent implements OnInit {

  totalAppliedLeaves = 2;

  staffDepartment : any;

  usersArray : any;

  userUid : any;

  currentUser : any;

  allLeaveApplications : any;

  userLeaveApplications : any = [];

  constructor( private staffAr : ActivatedRoute, private httpHndlr : HttpHandlerService){

  }


  ngOnInit(): void {
    
    
    this.httpHndlr.getUsers().subscribe( ( getUsersArray : any ) => {
            
      // console.log(getUsersArray);
      this.usersArray = getUsersArray;

      this.staffAr.params.subscribe( ( staffParam : any ) => {
        // console.log(staffParam.uid);
        this.userUid = staffParam.uid;
      } )

        //  console.log(this.usersArray, this.userUid);
        this.usersArray.forEach( ( user : any) => {
              if (user.uid == this.userUid) {
                  this.currentUser = user;
              }
        });


        this.httpHndlr.getLeaveApplications().subscribe( ( getla : any ) => {
            this.allLeaveApplications = getla;
            console.log(this.allLeaveApplications);
            this.allLeaveApplications.forEach( ( ala : any ) => {
              if( ala.department == this.staffDepartment ){
                this.totalAppliedLeaves++;
                this.userLeaveApplications.push(ala);
              }
              
            } )
        } )
        
        
      })
  
    this.staffAr.queryParams.subscribe( ( staffDep : any ) => {
      // console.log(staffDep.dep);
      this.staffDepartment = staffDep.dep;
    } )

  }


  changeStatus( lid : any, updStatus : any){
    // might need to leave application obj with latest status for patch / put method 
    
    // this.httpHndlr.onStatusUpdate(updStatus);

    this.httpHndlr.onStatusUpdate(lid, updStatus).subscribe( ( upds : any ) => {
        console.log('status updated', upds);
        // location.reload(); 
        
        this.httpHndlr.getLeaveApplications().subscribe( ( latestArray : any ) => {
          this.allLeaveApplications = latestArray;
          this.userLeaveApplications = [];
          // console.log(this.allLeaveApplications);
          this.allLeaveApplications.forEach( ( ala : any ) => {
            if( ala.department == this.staffDepartment ){
              this.userLeaveApplications.push(ala);
            }
            
          } )
        } )

    } )



  }
  


}
