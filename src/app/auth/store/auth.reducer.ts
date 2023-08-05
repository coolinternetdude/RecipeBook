import { createReducer } from '@ngrx/store';
import { User } from '../user.model';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(initialState);
