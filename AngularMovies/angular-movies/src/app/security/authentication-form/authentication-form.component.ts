import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from '../security.models';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.css']
})
export class AuthenticationFormComponent implements OnInit {
  form: FormGroup;
  @Input()
  action: string = 'Register';
// ovdje emitiraš iz html-a
  @Output()
  onSubmit = new EventEmitter<UserCredentials>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      password: ['', {
        validators: [Validators.required]
      }]
    });
  }

  getEmailErrorMessage(){
    const field = this.form.get('email');
    if (field.hasError('required')){
      return 'The email field is required';
    }

    if (field.hasError('email')){
      return 'The email is invalid';
    }
// otherwise we will return nothing
    return '';
  }

}


