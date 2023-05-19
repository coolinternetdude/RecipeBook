import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

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
  constructor(private http: HttpClient) {}

  signUp(user: User) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkP3kulafvlcmzbfL5UvTYC1-RazKyrNg',
        user
      )
      .pipe(
        catchError((resError) => {
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
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  logIn(user: User) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkP3kulafvlcmzbfL5UvTYC1-RazKyrNg',
        user
      )
      .pipe(
        catchError((resError) => {
          let errorMessage = 'Unknow error encountered';
          switch (resError.error.error.message) {
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
        })
      );
  }
}
