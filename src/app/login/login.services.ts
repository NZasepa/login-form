import { Injectable } from '@angular/core';
import { MockResponse, User } from './login.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginServices {
  private mockUser: User;

  constructor() {
    this.mockUser = {
      email: 'test@test.pl',
      password: 'Password1'
    };
  }

  /**
   * User authentication
   *
   * @param {string} email
   * @param {string} password
   * @returns {Observable<MockResponse>}
   */
  authenticate(email: string, password: string): Observable<MockResponse> {
    // First of, check if email and password match the user
    if (email === this.mockUser.email && password === this.mockUser.password) {
      return Observable.of({
        status: 200,
        data: 'login successful'
      });
    }

    // Validate email and password
    const emailValid = this.validateEmail(email);
    const passwordValid = this.validatePassword(password);

    if (!emailValid || !passwordValid) {
      let data = [];

      if (!emailValid) {
        data = [{ email: 'invalid email' }];
      }

      if (!passwordValid) {
        data = [...data, { password: 'invalid password' }];
      }

      return Observable.throw({
        status: 422,
        data: data
      });
    }

    // All possibilities checked, user not authenticated
    return Observable.throw({
      status: 403,
      data: 'invalid email or password'
    });
  }

  /**
   * Validate email
   *
   * @param email
   * @returns {boolean}
   */
  private validateEmail(email): boolean {
    // Taken this regex from the internet
    const check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return check.test(email);
  }

  /**
   * Validate password
   *
   * @param password
   * @returns boolean
   */
  private validatePassword(password): boolean {
    const preparedPassword = password ? password.split('') : [];

    // Test if password includes a large character
    const largeCheck = preparedPassword.some(single => single !== single.toLowerCase());

    // Test if password includes a small character
    const smallCheck = preparedPassword.some(single => single === single.toLowerCase());

    // Test if password includes a number
    const numberCheck = preparedPassword.some(single => !Number.isNaN(Number(single)));

    return largeCheck && smallCheck && numberCheck;
  }
}
