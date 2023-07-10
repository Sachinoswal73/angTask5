import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHandlerService } from '../shared/httpHandler.service';
import { NewUserModel } from '../shared/newUser.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {


  registerForm : any;

  formSubmitted = false;

  constructor( private httpHndlr : HttpHandlerService){

  }


  ngOnInit(): void {

        this.registerForm = new FormGroup({
            designation : new FormControl('', Validators.required),      
            firstName : new FormControl('', Validators.required),      
            lastName : new FormControl('', Validators.required),   
            email : new FormControl('', Validators.required),      
            contact : new FormControl('', Validators.required),            
            department : new FormControl('', Validators.required),   
            username : new FormControl('', Validators.required),  
            password : new FormControl('', Validators.required)      
        })

        // console.log(this.registerForm);

  }


  onSubmit(){

      this.formSubmitted = true;
      // console.log(this.registerForm.value);
      
      let newUser = new NewUserModel(this.registerForm.value.designation, this.registerForm.value.firstName, this.registerForm.value.lastName, this.registerForm.value.email, this.registerForm.value.contact, this.registerForm.value.department, this.registerForm.value.username, this.registerForm.value.password);
      // console.log(newUser);

      this.httpHndlr.onRegister(newUser).subscribe( ( nwUsr : any ) => {
            console.log(nwUsr);
      } )

      this.registerForm.reset();

  }


}
