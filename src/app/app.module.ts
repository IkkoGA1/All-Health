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
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PropertyFormComponent } from './admin/property-form/property-form.component';
import { CategoryService } from './category.service';
import { StatusService } from './status.service';
import { PropertyService } from './property.service';
import { CustomFormsModule } from 'ngx-custom-validators';
import { DataTableModule } from 'angular5-data-table';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { AdminPropertiesComponent } from './admin/admin-properties/admin-properties.component';
import { RentComponent } from './rent/rent.component';
import { RentalService } from './rental-cart.service';
import { StatesService } from './states.service';



@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    AdminPropertiesComponent,
    PropertyFormComponent,
    RentComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule,
    DataTableModule.forRoot(),
    CustomFormsModule,
    CommonModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent },
      {path: 'about', component: AboutComponent },
      {path: 'login', component: LoginComponent },
      {path: 'rent', component: RentComponent },
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
        path: 'admin/properties',
        component: AdminPropertiesComponent,
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
    RentalService,
    StatesService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
