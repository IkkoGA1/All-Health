import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import {  AngularFireAuth } from '@angular/fire/auth';
import { AppUser } from './models/app.user';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { 
    
  }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      user: user.displayName,
      email: user.email,
      isEmailVerified: user.emailVerified,
    });
  }
  get(uid: string): Observable<any> {
    return this.db.object('/users/' + uid).valueChanges();
  }
  
  getAll(): Observable<AppUser[]> {
    return this.db.list('/users').snapshotChanges()
      .pipe(
        map(users =>
          users.map(u => ({
            key: u.payload.key, ...u.payload.val() as AppUser
          }))
        )
      );
  }
  
  
  
    
    
  
}