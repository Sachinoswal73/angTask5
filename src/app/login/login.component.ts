
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHandlerService } from '../shared/httpHandler.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm : any;

  getUsersArray : any;

  getUserObject : any;

  rightCredentials = false;

  formSubmitted = false;

  
  constructor( private loginRouter : Router, private httpHndlr : HttpHandlerService, private arLogin : ActivatedRoute, private authSer : AuthService  ){

  }


  ngOnInit(): void {

    this.loginForm = new FormGroup({
        username : new FormControl('', Validators.required),
        pwd : new FormControl('', Validators.required)
    })

  }


  onSubmit(){

    this.formSubmitted = true;

    //console.log(this.loginForm.value);

    this.httpHndlr.getUsers().subscribe( ( gtusrs : any ) => {
          // console.log(gtusrs);
          this.getUsersArray = gtusrs;
          // console.log(this.getUsersArray);
          this.getUserObject = this.getUsersArray.find( ( usrObj : any ) => {
              return usrObj.username == this.loginForm.value.username && usrObj.password == this.loginForm.value.pwd; 
          } )
          // console.log(this.getUserObject);
          if(this.getUserObject){
            this.rightCredentials = true;
            // console.log('checking getUserObject');
            this.authSer.login();
            if ( this.getUserObject.designation === 'hod' ){
              this.loginRouter.navigate(
                ['dashboardhod', this.getUserObject.uid],
                {
                  relativeTo : this.arLogin,
                  queryParams : { dep : this.getUserObject.department }
                }
                );
            } 
            else {
                this.loginRouter.navigate(
                  ['dashboardstaff', this.getUserObject.uid],
                  {
                    relativeTo : this.arLogin,
                    queryParams : { dep : this.getUserObject.department }
                  }
                  );
            }
            // carry :id & hod or staff as queryParam & dpartment sci, com or Arts as well 
          }
    } )


  }


}
