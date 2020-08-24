import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Property } from './models/property';
import { RentalCart } from './models/rental-cart';
import { PropertyService } from './property.service';
import { Rental } from './models/rental';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private db: AngularFireDatabase) {}

  async getRental(): Promise<Observable<RentalCart>> {
    let rentalId = await this.getOrCreateRentalId();
    return this.db.object('/rental-properties/' + rentalId).snapshotChanges()
    .pipe(map(r => new RentalCart(r.payload.exportVal().items)));
  }

  async rentalComplete() {
    localStorage.removeItem('rentalId');
    return localStorage.clear();

  }
  
  private async getOrCreateRentalId(): Promise<string>  {

    let rentalId = localStorage.getItem('rentalId');
    if (rentalId) return rentalId;
   
    let result = await this.create();
    localStorage.setItem('rentalId', result.key);
    return result.key;
  }

  private create() {
    return this.db.list('/rental-properties').push({
      dateCreated: new Date().getTime(),
    });
  }
  
  private getItem(rentalId: string, propertyId: string) {
    return this.db.object('/rental-properties/' + rentalId + '/items/' + propertyId);  
  }

  async addProperty(property: Property) {
    this.updateProperty(property);
  }

  private async updateProperty(property: Property) {
    let rentalId = await this.getOrCreateRentalId();
    let item$ = this.getItem(rentalId, property.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      item$.update({ property: property, quantity: 1 });
      if (item.payload.exists()) {
        let quantity = item.payload.exportVal().quantity;
        if (quantity === 0) item$.remove();
        else
          item$.update({
            property: property
            
          });
      } else {
        item$.set({ property: property});
      }
    })
  }
    
  
  // Section for rental form creation

  getAllRentalForms(): Observable<Rental[]> {
    return this.db.list('/rental-properties').snapshotChanges()
      .pipe(
        map(rentals =>
          rentals.map(r => ({
            key: r.payload.key, ...r.payload.val() as Rental
          }))
        )
      );
  }

  async addRentalForm(rentalForm: Rental) {
    this.updateRentalForm(rentalForm);
  }

  private async updateRentalForm(rentalForm: Rental) {
    let rentalId = await this.getOrCreateRentalId();
    let item$ = this.getItem(rentalId, rentalForm.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      item$.update({ rentalForm: rentalForm });
      if (item.payload.exists()) {
        let quantity = item.payload.exportVal().quantity;
        if (quantity === 0) item$.remove();
        else
          item$.update({
            rentalForm: rentalForm
          });
      } else {
        item$.set({ rentalForm: rentalForm });
      }
    })
  }
  createRentalForm(rental) {
    return this.db.list('/rental-properties').push(rental);
  }

  update(rentalId, rental) {
    return this.db.object('/rental-properties/' + rentalId + '/items/').update(rental);
  }

  get(rentalId) {
    return this.db.object('/rental-properties/' + rentalId);  
  }

  // End of rental form creation

}
