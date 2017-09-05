import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoginData } from '../login.models';

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
      ]),
      transition('* => void', [
        animate('.4s ease-in-out', style({
          transform: 'translate(-100%)',
          opacity: 0
        }))
      ])
    ]),
    trigger('fadeSuccessCardIn', [
      state('in', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('void => in', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('.6s .5s ease-in-out')
      ]),
      transition('* => void', [
        animate('.6s ease-in-out', style({
          transform: 'translate(-100%)',
          opacity: 0
        }))
      ])
    ]),
  ]
})
export class LoginFormComponent implements OnInit, AfterViewInit {
  @Input() loading: boolean;
  @Input() step: string;

  @Output() onLogin: EventEmitter<LoginData>;

  loginForm: FormGroup;
  authenticated = false;

  constructor(private fb: FormBuilder, private changeRef: ChangeDetectorRef) {
    this.onLogin = new EventEmitter<LoginData>();
  }

  ngOnInit() {
    // Init form controls
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      remember: [false]
    });
  }

  ngAfterViewInit() {
    // Get saved email
    const savedEmail = localStorage.getItem('loginEmail');

    // Set saved email
    if (savedEmail) {
      this.loginForm.get('email').setValue(savedEmail);
      this.loginForm.get('remember').setValue(true);

      // Detect changes
      this.changeRef.detectChanges();
    }
  }

  onFormAnimationDone(event) {
    if (event.fromState === 'in' && event.toState === 'void') {
      this.authenticated = true;
    }
  }

  prepareData(): LoginData {
    const formModel = this.loginForm.value;

    return {
      email: formModel.email as string,
      password: formModel.password as string,
      remember: formModel.remember
    };
  }

  onSubmit() {
    const formData = this.prepareData();
    this.onLogin.emit(formData);
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
