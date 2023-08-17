import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import { logIn, logOut } from './auth.actions';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(logIn, (state, action) => {
    const CurrentUser = new User(
      action.email,
      action.id,
      action.token,
      action.expirationDate
    );
    return { ...state, user: CurrentUser };
  }),
  on(logOut, (state) => {
    return { ...state, user: null };
  })
);
