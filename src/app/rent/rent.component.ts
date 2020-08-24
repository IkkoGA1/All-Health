import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PropertyService } from './../property.service';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { take } from 'rxjs/internal/operators';
import { RentalService } from '../rental-cart.service';
import { property } from 'ngx-custom-validators/src/app/property/validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent {
  id;
  rental: any = {};
  propertyId;
  
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private rentalService: RentalService) {

    this.id = this.route.snapshot.paramMap.get('id');
     if (this.id) this.rentalService.get(this.id)
    .valueChanges()
    .pipe(take(1)).subscribe(r => this.rental = r);
  }
  
  save(rental) {
    if (this.id) this.rentalService.addRentalForm(this.id);
    
    else this.rentalService.addRentalForm(rental);
    window.alert('Thank you for your application. You will be contacted by a team member shortly.');
    this.router.navigate(['/']);
    this.completeRental();
  }
 
  completeRental() {
     this.rentalService.rentalComplete();
  }
 
}
