import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

import { LoginServices } from './login.services';
import * as LoginActions from './login.actions';
import { LoginData } from './login.models';

@Injectable()
export class LoginEffects {

  /**
   * Authenticate user with email and password
   *
   * @type {Observable<any>}
   */
  @Effect()
  authenticate$: Observable<Action> = this.actions$
    .ofType(LoginActions.LOGIN_REQUESTED)
    .map((action: LoginActions.LoginRequested) => action.payload)
    .switchMap((loginData: LoginData) => {
      const nextAuthenticate$ = this.actions$.ofType(LoginActions.LOGIN_REQUESTED).skip(1);

      return this.loginService.authenticate(loginData.email, loginData.password)
        .takeUntil(nextAuthenticate$)
        .materialize() // Only for mocked response loading purpose
        .delay(1000) // Only for mocked response loading purpose
        .dematerialize() // Only for mocked response loading purpose
        .map((result) => {
          const savedEmail = localStorage.getItem('loginEmail');

          // If "remember" is ticked, save email
          if (loginData.remember) {
            localStorage.setItem('loginEmail', loginData.email);
          } else if (savedEmail && savedEmail === loginData.email) {
            // Otherwise, remove currently saved email if it's the same
            localStorage.removeItem('loginEmail');
          }

          return new LoginActions.LoginSuccess(result);
        })
        .catch((err) => {
          return Observable.of(new LoginActions.LoginFailure(err));
        });
    });

  constructor(private actions$: Actions, private loginService: LoginServices) { }
}
