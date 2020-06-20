import { Component } from '@angular/core';
import { AuthService } from './../auth.service';
import { AppUser } from './../models/app.user';
import { auth } from 'firebase';
import {Router } from '@angular/router';



@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser;
 
  
  constructor(private auth: AuthService, private router: Router) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
    
  }

 
  logout() {
    this.auth.logout();
    
  }
  
  

}