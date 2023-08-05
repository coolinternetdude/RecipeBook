import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  editIngredient,
  startEditing,
  stopEditing,
} from './shopping-list.actions';

export interface ShoppingState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: ShoppingState = {
  ingredients: [
    new Ingredient('Apples', 2),
    new Ingredient('Tomatoes', 5),
    new Ingredient('Onion', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const shoppingReducer = createReducer(
  initialState,
  on(addIngredient, (state, action) => ({
    ...state,
    ingredients: [
      ...state.ingredients,
      new Ingredient(action.ingredient.name, action.ingredient.amount),
    ],
  })),
  on(editIngredient, (state, action) => {
    const newIngredients = [...state.ingredients];
    newIngredients[state.editedIngredientIndex] = action.ingredient;
    return { ...state, ingredients: newIngredients };
  }),
  on(addIngredients, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, ...action.ingredients],
  })),
  on(deleteIngredient, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients.filter(
        (val, i) => i !== state.editedIngredientIndex
      ),
    };
  }),
  on(startEditing, (state, action) => ({
    ...state,
    editedIngredient: { ...state.ingredients[action.index] },
    editedIngredientIndex: action.index,
  })),
  on(stopEditing, (state) => ({
    ...state,
    editedIngredient: null,
    editedIngredientIndex: -1,
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
