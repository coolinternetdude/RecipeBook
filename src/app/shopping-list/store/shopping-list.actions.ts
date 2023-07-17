import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const addIngredient = createAction(
  '[Ingredient] Add',
  props<{ ingredient: Ingredient }>()
);

// export class addIngredientFn implements Action {
//   readonly type: string = '[Ingredient] Add';
//   payload: Ingredient;
// }
