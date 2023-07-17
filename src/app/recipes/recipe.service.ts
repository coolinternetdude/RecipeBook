import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { addIngredients } from '../shopping-list/store/shopping-list.actions';
import {
  AppState,
  ShoppingState,
} from '../shopping-list/store/shopping-list.reducer';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeListChanged = new Subject<Recipe[]>();
  constructor(private store: Store<AppState>) {}
  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeListChanged.next(this.recipes.slice());
  }

  addIngredientsToshoppingList(ingredients: Ingredient[]) {
    // the commented solution emit a lot of unecessary events
    // recipe.ingredients.forEach((item) => {
    //   this.Shopping.addIngredient(item);
    // });
    this.store.dispatch(addIngredients({ ingredients }));
    //this.Shopping.addIngredients(ingredients);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipeListChanged.next(this.recipes.slice());
  }

  editRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.recipeListChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeListChanged.next(this.recipes.slice());
  }
}
