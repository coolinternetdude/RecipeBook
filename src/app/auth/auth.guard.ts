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

export const authGuardFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const authService = inject(AuthStorageService);
  const router = inject(Router);
  return authService.user.pipe(
    take(1),
    map((user) => {
      const isAuthenticated = !!user;
      if (isAuthenticated) return true;
      return router.createUrlTree(['/signin']);
    })
  );
};
