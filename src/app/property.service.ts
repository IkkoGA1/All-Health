import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { Property } from './models/property';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private db: AngularFireDatabase) { }

  create(property) {
    return this.db.list('/properties').push(property);
  }

  getAll(): Observable<Property[]> {
    return this.db.list('/properties').snapshotChanges()
      .pipe(
        map(properties =>
          properties.map(p => ({
            key: p.payload.key, ...p.payload.val() as Property
          }))
        )
      );
  }

  getAvailable(): Observable<Property[]> {
    return this.db.list('/properties', ref => ref.orderByChild
    ('rentalStatus').equalTo('available')).snapshotChanges()
    .pipe(
      map(properties =>
        properties.map(p => ({
          key: p.payload.key, ...p.payload.val() as Property
        }))
      )
    );
    
  }

  get(propertyId) {
    return this.db.object('/properties/' + propertyId);  
  }

  update(propertyId, property) {
    return this.db.object('/properties/' + propertyId).update(property);
  }

  delete(productId) {
    return this.db.object('/properties/' + productId).remove();
  }

  
}
