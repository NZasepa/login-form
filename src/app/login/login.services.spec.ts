import { LoginServices } from './login.services';
import { LoginData, MockResponse } from './login.models';
import { Observable } from 'rxjs/Observable';

describe('LoginServices', () => {
  let service: LoginServices;
  let successResponse: MockResponse;
  let failureResponse: MockResponse;
  let emailValidationResponse: MockResponse;
  let passwordValidationResponse: MockResponse;

  beforeEach(() => {
    service = new LoginServices();
    successResponse = {
      status: 200,
      data: 'login successful'
    };
    failureResponse = {
      status: 403,
      data: 'invalid email or password'
    };
    emailValidationResponse = {
      status: 422,
      data: [{ email: 'invalid email' }]
    };
    passwordValidationResponse = {
      status: 422,
      data: [{ password: 'invalid password' }]
    };
  });

  it('#authenticate should return success response with email "test@test.pl" and "Password1"', () => {
    const mockUser: LoginData = {
      email: 'test@test.pl',
      password: 'Password1',
      remember: false
    };

    expect(service.authenticate(mockUser.email, mockUser.password)).toEqual(Observable.of(successResponse));
  });

  it('#authenticate should return failure response with email "test@test.pl" and "Password123"', () => {
    const mockUser: LoginData = {
      email: 'test@test.pl',
      password: 'Password123',
      remember: false
    };

    expect(service.authenticate(mockUser.email, mockUser.password)).toEqual(Observable.throw(failureResponse));
  });

  it('#authenticate should return email validation failure response with email "testtest.pl" and "Password123"', () => {
    const mockUser: LoginData = {
      email: 'test@test',
      password: 'Password123',
      remember: false
    };

    expect(service.authenticate(mockUser.email, mockUser.password)).toEqual(Observable.throw(emailValidationResponse));
  });

  it('#authenticate should return password validation failure response with email "test@test.pl" and "Password"', () => {
    const mockUser: LoginData = {
      email: 'testtest.pl',
      password: 'Password123',
      remember: false
    };

    expect(service.authenticate(mockUser.email, mockUser.password)).toEqual(Observable.throw(emailValidationResponse));
  });
});
