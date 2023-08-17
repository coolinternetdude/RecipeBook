import { createAction, props } from '@ngrx/store';

export const login_Start = createAction(
  '[User] LoginStart',
  props<{ email: string; password: string }>()
);
export const logIn = createAction(
  '[User] Login',
  props<{ email: string; id: string; token: string; expirationDate: Date }>()
);
export const logOut = createAction('[User] Logout');
