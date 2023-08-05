import * as fromShopping from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: fromShopping.ShoppingState;
  auth: fromAuth.AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShopping.shoppingReducer,
  auth: fromAuth.authReducer,
};
