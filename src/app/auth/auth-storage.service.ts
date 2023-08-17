import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { Store } from '@ngrx/store';
import * as appStore from '../store/app.reducer';
import { logIn, logOut } from './store/auth.actions';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthStorageService {
  //user = new BehaviorSubject<User>(null);
  private expirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<appStore.AppState>
  ) {}

  // Function that handle error messages coming from firebase
  errorHandler(resError: HttpErrorResponse) {
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
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseAPIkey,
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
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIkey,
        user
      )
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          this.authenticateUser(resData);
        })
      );
  }
  // autoLogin

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('user'));
    if (!userData) return;

    const currentUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (currentUser.token) {
      //this.user.next(currentUser);
      this.store.dispatch(
        logIn({
          email: currentUser.email,
          id: currentUser.id,
          token: currentUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
        })
      );
      const expiresIn =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expiresIn);
    }
  }

  // logout

  logOut() {
    //this.user.next(null);
    this.store.dispatch(logOut());
    this.router.navigate(['/signin']);
    localStorage.removeItem('user');
    if (this.expirationTimer) clearTimeout(this.expirationTimer);
    this.expirationTimer = null;
  }
  // autoLogout

  autoLogout(expiesIn: number) {
    this.expirationTimer = setTimeout(() => {
      this.logOut();
    }, expiesIn);
  }

  authenticateUser(resData: {
    email: string;
    localId: string;
    idToken: string;
    expiresIn: number;
  }) {
    const expirationDate = new Date(
      new Date().getTime() + resData.expiresIn * 1000
    );

    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );
    //this.user.next(user);
    this.store.dispatch(
      logIn({
        email: user.email,
        id: user.id,
        token: user.token,
        expirationDate: expirationDate,
      })
    );
    this.autoLogout(resData.expiresIn * 1000);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
