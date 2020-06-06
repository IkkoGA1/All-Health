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
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PropertiesComponent } from './admin/properties/properties.component';
import { PropertyFormComponent } from './admin/property-form/property-form.component';
import { CategoryService } from './category.service';
import { StatusService } from './status.service';
import { PropertyService } from './property.service';
import { CustomFormsModule } from 'ngx-custom-validators';
import { DataTableModule } from 'angular5-data-table';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    AboutComponent,
    AboutFaqComponent,
    AdminStaffComponent,
    LoginComponent,
    AboutStaffComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    PropertiesComponent,
    PropertyFormComponent,
   
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule,
    DataTableModule.forRoot(),
    CustomFormsModule,
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
      {path: 'registration', component: RegistrationComponent },
      {path: 'forgot-password', component: ForgotPasswordComponent },
      {
        path: 'admin/properties/new',
        component: PropertyFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/properties/:id',
        component: PropertyFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/staff',
        component: AdminStaffComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },

      {
        path: 'admin/properties',
        component: PropertiesComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    StatusService,
    PropertyService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
