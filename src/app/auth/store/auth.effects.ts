import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { logIn, login_Start } from './auth.actions';
import { catchError, map, of, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../auth-storage.service';
import { environment } from 'src/environments/environment.development';

// const errorHandler = function errorHandler(resError: HttpErrorResponse) {
//   let errorMessage = 'Unknow error encountered';
//   switch (resError.error.error.message) {
//     case 'EMAIL_EXISTS':
//       errorMessage = 'This email is already in use';
//       break;
//     case 'OPERATION_NOT_ALLOWED':
//       errorMessage = 'You are not allowed to sign in';
//       break;
//     case 'TOO_MANY_ATTEMPTS_TRY_LATER':
//       errorMessage = 'Too many request, please try again later';
//       break;
//     case 'EMAIL_NOT_FOUND':
//       errorMessage = 'This Email is not found';
//       break;
//     case 'INVALID_PASSWORD':
//       errorMessage = 'Invalid Password';
//       break;
//     case 'USER_DISABLED':
//       errorMessage = 'This user was disabled';
//       break;
//   }
//   return throwError(() => new Error(errorMessage));
// };

@Injectable()
export class AuthEffects {
  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login_Start),
      switchMap((res) => {
        return this.http
          .post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.firebaseAPIkey,
            { email: res.email, password: res.password }
          )
          .pipe(
            map((res) => {
              const expirationDate = new Date(
                new Date().getTime() + res.expiresIn * 1000
              );
              return logIn({
                email: res.email,
                id: res.localId,
                token: res.idToken,
                expirationDate: expirationDate,
              });
            }),
            catchError((error) => {
              return of();
            })
          );
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
