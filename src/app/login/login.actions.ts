import { Action } from '@ngrx/store';

import { LoginData } from './login.models';

const SPACE_NAME = '[Login]';
export const LOGIN_REQUESTED = `${SPACE_NAME} Login Requested`;
export const LOGIN_SUCCESS = `${SPACE_NAME} Login Success`;
export const LOGIN_FAILURE = `${SPACE_NAME} Login Failure`;

export class LoginRequested implements Action {
  readonly type = LOGIN_REQUESTED;

  constructor(public payload: LoginData) { }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: any = null) { }
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;

  constructor(public payload: any = null) { }
}

export type Actions = LoginRequested |
  LoginSuccess |
  LoginFailure;
