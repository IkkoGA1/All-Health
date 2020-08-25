import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { AppUser } from './../models/app.user';
import { auth } from 'firebase';
import {Router } from '@angular/router';
import { RentalCart } from '../models/rental-cart';
import { Observable } from 'rxjs/Observable';
import { RentalService } from '../rental.service';



@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<RentalCart>
  
  constructor(private auth: AuthService, private router: Router, private rentalService: RentalService) {
    

    
  }
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.rentalService.getRental();
  }

 
  logout() {
    this.auth.logout();
    
  }
  
  

}