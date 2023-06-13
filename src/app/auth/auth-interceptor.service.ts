import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, exhaustMap } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthStorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
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
