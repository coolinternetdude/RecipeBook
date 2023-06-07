import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { catchError, throwError, BehaviorSubject, tap } from 'rxjs';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthStorageService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  // Function that handle error messages coming from firebase
  private errorHandler(resError: HttpErrorResponse) {
    let errorMessage = 'Unknow error encountered';
    switch (resError.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email is already in use';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'You are not allowed to sign in';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many request, please try again later';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This Email is not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This user was disabled';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }

  // Sign up function

  signUp(user: User) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkP3kulafvlcmzbfL5UvTYC1-RazKyrNg',
        user
      )
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          this.authenticateUser(resData);
        })
      );
  }

  // login
  logIn(user: User) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkP3kulafvlcmzbfL5UvTYC1-RazKyrNg',
        user
      )
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          this.authenticateUser(resData);
        })
      );
  }

  authenticateUser(resData: {
    email: string;
    localId: string;
    idToken: string;
    expiresIn: string;
  }) {
    const expirationDate = new Date(
      new Date().getTime() + Number(resData.expiresIn) * 1000
    );

    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );
    this.user.next(user);
  }
}
