import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const addIngredient = createAction(
  '[Ingredient] Add',
  props<{ ingredient: Ingredient }>()
);

export const addIngredients = createAction(
  '[Ingredients] Add',
  props<{ ingredients: Ingredient[] }>()
);

export const editIngredient = createAction(
  '[Ingredient] Edit',
  props<{ id: number; ingredient: Ingredient }>()
);

export const deleteIngredient = createAction(
  '[Ingredient] Delete',
  props<{ id: number }>()
);

export const startEditing = createAction(
  '[Ingredient] StratEdit',
  props<{ index: number }>()
);
export const stopEditing = createAction('[Ingredient] StopEdit');

// export class addIngredientFn implements Action {
//   readonly type: string = '[Ingredient] Add';
//   payload: Ingredient;
// }
