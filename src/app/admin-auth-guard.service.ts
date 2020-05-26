import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';





@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(
    private userService: UserService,
    private auth: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
     .pipe((map((appUser) => appUser.isAdmin))
     );
  }
  get emailVerified(): Observable<boolean> {
    return this.auth.appUser$
      .pipe((map((appUser) => appUser.isEmailVerified))
      );
  }
  
}
