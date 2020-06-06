import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private db: AngularFireDatabase) { }

  getStatus(){
    return this.db.list('/status', ref => ref.orderByChild('name')).snapshotChanges();
  }
}
