import { hot, cold } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';

import * as LoginActions from './login.actions';
import { LoginData } from './login.models';
import { LoginEffects } from './login.effects';

describe('LoginEffects', () => {
  let loginServices;
  let mockUser: LoginData;
  let successResponse;
  let failureResponse;
  let validationResponse;

  beforeEach(() => {
    // Return delay immediately
    spyOn(Observable.prototype, 'delay').and.callFake(function () {
      return this;
    });

    // Set responses
    successResponse = {
      status: 200,
      data: 'login successful'
    };

    failureResponse = {
      status: 403,
      data: 'invalid email or password'
    };
  });

  it('should return LOGIN_SUCCESS action on correct data', () => {
    mockUser = {
      email: 'test@test.pl',
      password: 'Password1',
      remember: true
    };

    const actions = new Actions(hot('--a-', { a: new LoginActions.LoginRequested(mockUser) }));
    const service = jasmine.createSpyObj('loginServices', ['authenticate']);
    service.authenticate.and.returnValue(Observable.of(successResponse));
    const effects = new LoginEffects(actions, service);

    const expected = cold('--b', { b: new LoginActions.LoginSuccess(successResponse) });

    expect(effects.authenticate$).toBeObservable(expected);
  });

  it('should return LOGIN_FAILURE action on wrong user data', () => {
    mockUser = {
      email: 'test@test.pl',
      password: 'Password123',
      remember: true
    };

    const actions = new Actions(hot('--a-', { a: new LoginActions.LoginRequested(mockUser) }));
    const service = jasmine.createSpyObj('loginServices', ['authenticate']);
    service.authenticate.and.returnValue(Observable.throw(failureResponse));
    const effects = new LoginEffects(actions, service);

    const expected = cold('--b', { b: new LoginActions.LoginFailure(failureResponse) });

    expect(effects.authenticate$).toBeObservable(expected);
  });

  it('should return LOGIN_FAILURE action on email validation error', () => {
    mockUser = {
      email: 'testtest.pl',
      password: 'Password123',
      remember: true
    };

    validationResponse = {
      status: 422,
      data: [
        { email: 'invalid email' }
      ]
    };

    const actions = new Actions(hot('--a-', { a: new LoginActions.LoginRequested(mockUser) }));
    const service = jasmine.createSpyObj('loginServices', ['authenticate']);
    service.authenticate.and.returnValue(Observable.throw(validationResponse));
    const effects = new LoginEffects(actions, service);

    const expected = cold('--b', { b: new LoginActions.LoginFailure(validationResponse) });

    expect(effects.authenticate$).toBeObservable(expected);
  });

  it('should return LOGIN_FAILURE action on password validation error', () => {
    mockUser = {
      email: 'test@test.pl',
      password: 'Password',
      remember: true
    };

    validationResponse = {
      status: 422,
      data: [
        { password: 'invalid password' }
      ]
    };

    const actions = new Actions(hot('--a-', { a: new LoginActions.LoginRequested(mockUser) }));
    const service = jasmine.createSpyObj('loginServices', ['authenticate']);
    service.authenticate.and.returnValue(Observable.throw(validationResponse));
    const effects = new LoginEffects(actions, service);

    const expected = cold('--b', { b: new LoginActions.LoginFailure(validationResponse) });

    expect(effects.authenticate$).toBeObservable(expected);
  });
});
