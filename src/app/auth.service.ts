import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import {  AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from './models/app.user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  

  constructor(
    public router: Router,
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;

  }
   
  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(switchMap(user => {
        if (user) return this.userService.get(user.uid);

        return of(null);
      }));
  }
  
  
  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('A password reset link was sent. Please check your inbox');
        return this.router.navigate(['/login']);
      }).catch((error) => {
        window.alert(error)
      })
  }

  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/login']);
      })
  }
    
  SignUpUser(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        
        this.SendVerificationMail();
        window.alert('A verification email was sent to the email address you provided. You will have to verify your email account before you can login.');
        return this.router.navigate(['/login']);

      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignInUser(email: string, password: string) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user.emailVerified !== true) {
          window.alert('Please validate your email address from your email account');
        } else if (res.user) {
          return this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }
      }).catch((error) => {
        window.alert(error.message);
        window.alert("Please register, if you haven't already");
      })
  }

}

  

