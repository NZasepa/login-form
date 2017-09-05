import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import * as LoginActions from './login.actions';
import { LoginData } from './login.models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'lf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading$: Observable<boolean>;
  step$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.loading$ = store.select(state => state.login.loading);
    this.step$ = store.select(state => state.login.step);
  }

  onLogin(loginData: LoginData) {
    this.store.dispatch(new LoginActions.LoginRequested(loginData));
  }
}
