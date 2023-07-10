import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHandlerService } from '../shared/httpHandler.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { connect } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})

export class StaffDashboardComponent implements OnInit {

  // notAppliedForLeaves = true;

  date : any;

  staffDepartment : any;

  usersArray : any;

  userUid : any;

  currentUser : any;

  leaveForm : any;

  userLeaveApplications : any = [];

  totalAppliedLeaves = 0;

  approvedLeaves = 0;

  rejectedLeaves = 0;

  pendingLeaves = 0;

  allLeaveApplications : any;


  constructor( private staffAr : ActivatedRoute, private httpHndlr : HttpHandlerService, private dashboardRouter : Router, private arDashboard : ActivatedRoute, private authSer : AuthService ){

  }


  ngOnInit(): void {
    
      this.date = new Date;

      // console.log(this.staffAr);

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

            // console.log(getla);
            this.allLeaveApplications = getla;
            console.log(this.allLeaveApplications);
            this.allLeaveApplications.forEach( ( ala : any ) => {
                if ( ala.uid == this.currentUser?.uid ) {
                    this.totalAppliedLeaves++;
                    if( ala.status == 'Pending' ) {
                      this.pendingLeaves++;
                    }
                    else if ( ala.status == 'Approved' ){
                      this.approvedLeaves++;
                    }
                    else {
                      this.rejectedLeaves++;
                    }
                    this.userLeaveApplications.push(ala);
                }
            } )
            
        } )


      } )


      this.staffAr.queryParams.subscribe( ( staffDep : any ) => {
          // console.log(staffDep.dep);
          this.staffDepartment = staffDep.dep;
      } )


      this.leaveForm = new FormGroup({
          fromDate : new FormControl('',Validators.required),
          toDate : new FormControl('',Validators.required),
          reason : new FormControl('',Validators.required)
      })


      

      // console.log(this.userLeaveApplications);

      // this.httpHndlr.leavesBehaSub.subscribe( ( latestArr : any ) => {
      //   this.allLeaveApplications = latestArr;
      //   console.log(this.allLeaveApplications);
      //   // this.userLeaveApplications = [];
      //   this.allLeaveApplications.forEach( ( ala : any ) => {
      //       if ( ala.uid == this.currentUser?.uid ) {
      //           this.totalAppliedLeaves++;
      //           this.userLeaveApplications.push(ala);
      //       }
      //   } )
      // } )


  }


  applyForLeave(){
    
    // console.log(this.leaveForm.value.fromDate);
    var date1 = new Date(this.leaveForm.value.fromDate);  
	  let date2 = new Date(this.leaveForm.value.toDate); 
    let Time = date2.getTime() - date1.getTime(); 
    let totalDays = Time / (1000 * 3600 * 24); //Diff in days

    let newLeaveApplication = {
      uid : this.currentUser.uid,
      firstName : this.currentUser.firstName,
      lastName : this.currentUser.lastName,
      department : this.currentUser.department,
      designation : this.currentUser.designation,
      fromDate : this.leaveForm.value.fromDate,
      toDate : this.leaveForm.value.toDate,
      totalDays : totalDays,
      reason : this.leaveForm.value.reason,
      status : 'Pending',
      extra : '' 
    }

    // console.log(newLeaveApplication);

    this.httpHndlr.onApplyForLeave(newLeaveApplication).subscribe( ( newla : any ) => {
        // console.log(newla);
        this.leaveForm.reset();
        this.httpHndlr.getLeaveApplications().subscribe( ( latestArray : any ) => {
            console.log('After addition of new application for leave -', latestArray);

            this.allLeaveApplications = latestArray;

            this.userLeaveApplications = [];

            this.totalAppliedLeaves++;
            this.pendingLeaves++;

            this.allLeaveApplications.forEach( ( ala : any ) => {
              if ( ala.uid == this.currentUser?.uid ) {
                  this.userLeaveApplications.push(ala);
              }
          } )

            // this.authSer.login();
            // location.reload();  

          

            // this.dashboardRouter.navigate(['']);

            // this.dashboardRouter.navigate( ['dashboardStaff',this.currentUser?.uid],
            // {
            //     // relativeTo : this.arDashboard,
            //     queryParams : { dep : this.currentUser?.department }
            // }
            // )

        } )
    } )    

  }


}
