import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list('/status', ref => ref.orderByChild('name')).snapshotChanges();
  }
  getAvailable() {
    return this.db.list('status', ref => ref.equalTo('available')).snapshotChanges();
  }
}
