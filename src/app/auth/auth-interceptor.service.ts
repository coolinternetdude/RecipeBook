import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, exhaustMap, from, map } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';
import * as appStore from '../store/app.reducer';
import { Store } from '@ngrx/store';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthStorageService,
    private store: Store<appStore.AppState>
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
      exhaustMap((user) => {
        if (!user) return next.handle(req);
        const transformedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(transformedReq);
      })
    );
  }
}
