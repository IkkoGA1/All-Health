import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(private db: AngularFireDatabase) { }


  getAllStates() {
    return this.db.list('/states', ref => ref.orderByChild('name')).snapshotChanges();
  }
}
