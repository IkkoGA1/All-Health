import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent  {

  regForm: any;
  constructor(private auth: AuthService, private fb: FormBuilder) { 
    this.regForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get email() { return this.regForm.get('email'); }
  get password() { return this.regForm.get('password'); }
  get confirmPassword() { return this.regForm.get('confirmPassword'); }


  signUpUser(){
    this.auth.SignUpUser(this.regForm.value.email, this.regForm.value.password);
  }

}
