import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { AdminStaffComponent } from './admin/admin-staff/admin-staff.component';
import { AboutStaffComponent } from './about/about-staff/about-staff.component';
import { AboutFaqComponent } from './about/about-faq/about-faq.component';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';




@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    AboutComponent,
    AboutFaqComponent,
    AdminStaffComponent,
    UserRegistrationComponent,
    LoginComponent,
    AboutStaffComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent },
      {path: 'about', component: AboutComponent },
      {path: 'about/staff', component: AboutStaffComponent },
      {path: 'about/faq', component: AboutFaqComponent },
      {path: 'login', component: LoginComponent },

      
      {path: 'user/registration', component: UserRegistrationComponent, canActivate: [AuthGuard]},
     
      
      {path: 'admin/staff', component: AdminStaffComponent, canActivate: [AuthGuard, AdminAuthGuard] },

    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
