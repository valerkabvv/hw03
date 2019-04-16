import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Iform} from '../interfaces/iform';
import {ValidationService} from './validation.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent implements OnInit {

  @Output() addForm = new EventEmitter<Iform>();
  isSubmitted = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private CustomValidator: ValidationService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [
        this.CustomValidator.emailValidation
      ]],
      passwords: this.formBuilder.group({
        password: ['',
          this.CustomValidator.passwordValidator
        ],
        password2: [''
        ]},
        { validators: this.CustomValidator.password2Validation}),
      agree: ['', [
        Validators.required,
      ]]
    });
  }

onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid || !this.form.value.agree) {
      return;
    }
    const filledForm: Iform = {
      email: this.form.value.email,
      password: this.form.get('passwords').value.password,
      agree: this.form.value.agree
     };
    this.addForm.emit(filledForm);
    this.isSubmitted = false;
    this.form.reset();
  }
}
