import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'lf-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  animations: [
    trigger('fadeCardIn', [
      state('in', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('void => in', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('.6s .5s ease-in-out')
      ])
    ])
  ]
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

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

  get remember() {
    return this.loginForm.get('remember');
  }
}
