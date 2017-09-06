import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges,
  OnInit,
  Output, SimpleChange, SimpleChanges, ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoginData } from '../login.models';
import { passwordValidator } from '../login.validators';

@Component({
  selector: 'lf-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  animations: [
    trigger('fadeCardIn', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => in', [
        style({ transform: 'translateY(50%)', opacity: 0 }),
        animate('.6s .5s ease-in-out')
      ]),
      transition('* => void', [
        animate('.4s ease-in-out', style({
          transform: 'translateY(-100%)',
          opacity: 0
        }))
      ])
    ]),
    trigger('fadeSuccessCardIn', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => in', [
        style({ transform: 'translateY(50%)', opacity: 0 }),
        animate('.6s .5s ease-in-out')
      ]),
      transition('* => void', [
        animate('.6s ease-in-out', style({
          transform: 'translateY(-100%)',
          opacity: 0
        }))
      ])
    ]),
    trigger('fadeFailureCard', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => in', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate('.6s .5s ease-in-out')
      ]),
      transition('* => void', [
        animate('.6s ease-in-out', style({
          transform: 'translateY(50px)',
          opacity: 0
        }))
      ])
    ]),
  ]
})
export class LoginFormComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() loading: boolean;
  @Input() step: string;

  @Output() onLogin: EventEmitter<LoginData>;

  @ViewChild('passwordInput') passwordInput: ElementRef;

  loginForm: FormGroup;
  authenticated = false;

  constructor(private fb: FormBuilder, private changeRef: ChangeDetectorRef) {
    this.onLogin = new EventEmitter<LoginData>();
  }

  ngOnInit() {
    // Init form controls
    this.createForm();
  }

  /**
   * Create reactive form
   */
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), passwordValidator()])],
      remember: [false]
    });
  }

  /**
   * After view is initialized
   */
  ngAfterViewInit() {
    // Get saved email
    const savedEmail = localStorage.getItem('loginEmail');

    // Set saved email
    if (savedEmail) {
      this.email.setValue(savedEmail);
      this.remember.setValue(true);

      // Detect changes
      this.changeRef.detectChanges();
    }
  }

  /**
   * On detected changes
   * Check if failed to log in - remove password
   *
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    const step: SimpleChange = changes.step;

    if (step && step.currentValue === 'failure') {
      this.password.setValue('');
      this.passwordInput.nativeElement.focus();
    }
  }

  /**
   * Form animation completed
   *
   * @param event
   */
  onFormAnimationDone(event) {
    if (event.fromState === 'in' && event.toState === 'void') {
      this.authenticated = true;
    }
  }

  /**
   * Prepare data for submission
   *
   * @returns {LoginData}
   */
  prepareData(): LoginData {
    const formModel = this.loginForm.value;

    return {
      email: formModel.email as string,
      password: formModel.password as string,
      remember: formModel.remember
    };
  }

  /**
   * On login form submission
   */
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
