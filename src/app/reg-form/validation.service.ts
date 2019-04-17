import { Injectable } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

    passwordValidator(control: FormControl): ValidationErrors {
    if (control.value === null) {return; }
    const isNumber = /\d/.test(control.value);
    const isSymbol = /\W/.test(control.value);
    const isLowCase = /[a-z]/.test(control.value);
    const isUpCase = /[A-Z]/.test(control.value);
    const isValidLength = control.value.length > 4;
    const condition = isNumber && isSymbol && isUpCase && isLowCase && isValidLength;
    let errors = '';
    if (!isNumber) {
        errors += 'число ';
      }
    if (!isSymbol) {
        errors += 'символ ';
      }
    if (!isLowCase) {
        errors += 'маленькую букву ';
      }
    if (!isUpCase) {
        errors += 'большую букву';
      }
    errors = errors.split(' ').join(', ');
    if (!isValidLength) {
        if (errors) {
          errors += ', ';
        }
        errors += 'длину больше 4';
      }
    if (!condition) {
    return {invalidPassword: 'пароль должен содержать: ' + errors};
    }
    return null;
    }

   emailValidation(control: FormControl): ValidationErrors {
    if (control.value === null) {return; }
    const lengthFlag = control.value.length < 100;
    const isEmptyFlag = !!control.value;
    const emailTemplateFlag = control.value.search(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/) !== -1;
    const condition = lengthFlag && isEmptyFlag && emailTemplateFlag;
    let emailErrorLog = '';
    if (!lengthFlag) {
    emailErrorLog += 'длинна должна быть менньше 100';
  }
    if (!emailTemplateFlag) {
  emailErrorLog += ' не адрес электронной почты';
}
    if (!isEmptyFlag) {
  emailErrorLog = 'строка должна быть непустой';
}
    if (!condition) {
    return {invalidEmail: emailErrorLog};
    }
    return null;
}

     password2Validation(control: FormGroup): ValidationErrors  {
     if (control.value === null) {return; }
     const isEqual = control.value.password === control.value.password2;
     if (!isEqual) {
       return {invalidPassword2: 'пароли не совпадают'};
     }
     if (control.get('password').invalid) {
       return {invalidPassword2: 'пароль некоректный'};
     }
     return null;
   }}





