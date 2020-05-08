import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { PatientMyportalComponent } from './patient/patient-myportal/patient-myportal.component';
import { AdminStaffComponent } from './admin/admin-staff/admin-staff.component';
import { AdminPatientsComponent } from './admin/admin-patients/admin-patients.component';
import { PatientHomeComponent } from './patient/patient-home/patient-home.component';
import { PatientRegistrationComponent } from './patient/patient-registration/patient-registration.component';
import { AboutStaffComponent } from './about/about-staff/about-staff.component';
import { AboutFaqComponent } from './about/about-faq/about-faq.component';




@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    AboutComponent,
    AboutFaqComponent,
    AdminStaffComponent,
    LoginComponent,
    AdminPatientsComponent,
    AboutStaffComponent,
    
  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule,
    FormsModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent },
      {path: 'about', component: AboutComponent },
      {path: 'about/staff', component: AboutStaffComponent },
      {path: 'about/faq', component: AboutFaqComponent },
      {path: 'login', component: LoginComponent },

      {path: 'registration', component: PatientRegistrationComponent },
      {path: 'my/portal', component: PatientMyportalComponent },
      {path: 'patient/home', component: PatientHomeComponent },

      {path: 'admin/patients', component: AdminPatientsComponent },
      {path: 'admin/staff', component: AdminStaffComponent },

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
