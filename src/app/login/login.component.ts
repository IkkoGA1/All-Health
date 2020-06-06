import { Component } from '@angular/core';
import { AuthService } from './../auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
 email: string;
 password: string;
 emailVerified: boolean;
 form: any;
 
  constructor(public auth: AuthService) { }

  login() {
    this.auth.login();
  }
  
  signInUser() {
    this.auth.SignInUser(this.email, this.password);
  }

  logout() {
    this.auth.logout();
  }

  
} 
