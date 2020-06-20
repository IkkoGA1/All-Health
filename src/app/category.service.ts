import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { StatusService } from 'src/app/status.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges();
  }
  
}
