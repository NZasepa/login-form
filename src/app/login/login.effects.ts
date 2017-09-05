import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { LoginServices } from './login.services';
import * as LoginActions from './login.actions';
import { LoginData } from './login.models';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class LoginEffects {
  @Effect()
  authenticate$: Observable<Action> = this.actions$
    .ofType(LoginActions.LOGIN_REQUESTED)
    .map((action: LoginActions.LoginRequested) => action.payload)
    .switchMap((loginData: LoginData) => {
      const nextAuthenticate$ = this.actions$.ofType(LoginActions.LOGIN_REQUESTED).skip(1);

      return this.loginService.authenticate(loginData.email, loginData.password)
        // .delay(3000)
        .takeUntil(nextAuthenticate$)
        .map((result) => {
          // If "remember" is ticked, save email
          if (loginData.remember) {
            localStorage.setItem('loginEmail', loginData.email);
          } else {
            // Otherwise, remove currently saved email
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
