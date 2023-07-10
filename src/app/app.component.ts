import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor( private loginRouter : Router, private loginAr : ActivatedRoute, private authSer : AuthService ){

  }

  title = 'angTask5';

  onLogin(){
    this.loginRouter.navigate([''], {
        relativeTo : this.loginAr
    });
  }

  onLogout(){
    this.loginRouter.navigate([''], {
      relativeTo : this.loginAr
    });
    this.authSer.logout();
  }

}
