import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';
import { Store } from '@ngrx/store';
import * as appStore from '../store/app.reducer';

export const authGuardFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const store = inject(Store<appStore.AppState>);
  const router = inject(Router);
  return store.select('auth').pipe(
    take(1),
    map((authState) => {
      return authState.user;
    }),
    map((user) => {
      const isAuthenticated = user;
      if (isAuthenticated) return true;
      return router.createUrlTree(['/signin']);
    })
  );
};
