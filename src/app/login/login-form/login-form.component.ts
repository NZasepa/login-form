import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'lf-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // Init form controls
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
      remember: ['']
    });

    console.log(this.loginForm.get('email'));
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
