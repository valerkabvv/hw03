import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Iform} from "../interfaces/iform";

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent implements OnInit {

  @Output() addForm = new EventEmitter<Iform>();
  emailCondition = false;
  passCondition = false;
  pass2Condition = false;
  agreed = false;
  isSubmitted = false;
  emailErrorLog = '';
  passErrorLog = 'пароль должен содержать: ';
  pass2ErrorLog = '';
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
      password2: [''],
      agree: ['']
    });

    this.form.valueChanges.subscribe(value => {
      // tslint:disable-next-line:no-console
      console.log(value);
    });
  }

  onInput() {
    const input = this.form.value.email;
    const lengthFlag = input.length < 100;
    const isEmptyFlag = !!input;
    const emailTemplateFlag = input.search(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)!==-1;
    if (lengthFlag && emailTemplateFlag && isEmptyFlag) {
      this.emailCondition = true;
    } else {
      this.emailCondition = false;
      this.emailErrorLog = '';
      if(!lengthFlag){
      this.emailErrorLog += 'длинна должна быть менньше 100';
      }
      if(!emailTemplateFlag){
        this.emailErrorLog += ' не адрес электронной почты'
      }
      if(!isEmptyFlag){
        this.emailErrorLog = 'строка должна быть непустой';
      }
    }
  }

  onInput1() {
    const pass = this.form.value.password;
    const isNumber = /\d/.test(pass);
    const isSymbol = /\W/.test(pass);
    const isLowCase=/[a-z]/.test(pass);
    const isUpCase=/[A-Z]/.test(pass);
    const isValidLength = pass.length > 4;
    if (isNumber && isSymbol &&isUpCase&&isLowCase &&isValidLength ) {
      this.passCondition = true;
    } else {
      this.passCondition = false;
      this.passErrorLog = 'пароль должен содержать: ';
      let errors='';
      if(!isNumber){
        errors+='число ';
      }
      if(!isSymbol){
        errors+='символ ';
      }
      if(!isLowCase){
        errors+='маленькую букву ';
      }
      if(!isUpCase){
        errors+='большую букву';
      }
      errors = errors.split(' ').join(', ');
      if(!isValidLength){
        if(errors){
          errors+=', ';
        }
        errors+='длину больше 4';
      }
      this.passErrorLog += errors;
    }
  }

  onInput2() {
    const pass1 = this.form.value.password;
    const pass2 = this.form.value.password2;
    const isEqual = pass1 === pass2;
    const fstPassCondition = this.passCondition;
    if (!isEqual || fstPassCondition === false) {
      this.pass2Condition = false;
      this.pass2ErrorLog ='';
      if(!isEqual){
        this.pass2ErrorLog='пароли не совпадают';
      }
      if(fstPassCondition === false){
        this.pass2ErrorLog='пароль некоректный';
      }
    } else {
      this.pass2Condition = true;
    }
  }

  onClick(){
    this.agreed = !this.agreed;
  }

  onSubmit(){
    this.isSubmitted = true;
    this.onInput();this.onInput1();this.onInput2();
    if(!this.emailCondition||!this.passCondition||!this.pass2ErrorLog||!this.agreed){
      return;
    }
    const filledForm:Iform ={
      email:this.form.value.email,
      password:this.form.value.password,
      agree:this.form.value.agree
     }
    this.addForm.emit(filledForm);
    this.form.reset();
    this.isSubmitted = false;
    this.emailCondition = false;
    this.passCondition=false;
    this.pass2Condition=false;
    this.agreed=false;
  }
}
