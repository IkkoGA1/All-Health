import { AbstractControl } from '@angular/forms';

export class PasswordValidators {
    static passwordsMustMatch(control: AbstractControl) {
        let password = control.get('password');
        let confirmPassword = control.get('confirmPassword');

        if (password.value !== confirmPassword.value)
            return  {passwordsMustMatch: true};
         
        return null;
    }
} 