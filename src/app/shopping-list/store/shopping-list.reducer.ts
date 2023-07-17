import { Action, createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import { addIngredient } from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 2),
    new Ingredient('Tomatoes', 5),
    new Ingredient('Onion', 10),
  ],
};

export const shoppingReducer = createReducer(
  initialState,
  on(addIngredient, (state, action) => ({
    ...state,
    ingredients: [
      ...state.ingredients,
      new Ingredient(action.ingredient.name, action.ingredient.amount),
    ],
  }))
);

// export function shoppingReduce(
//   state = initialState,
//   action: Action | addIngredientFn
// ) {
//   if (action.type === '[Ingredient] Add') {
//     return {
//       ...state,
//       ingredients: [
//         ...state.ingredients,
//         new Ingredient(
//           (action as addIngredientFn).payload.name,
//           (action as addIngredientFn).payload.amount
//         ),
//       ],
//     };
//   }
// }
