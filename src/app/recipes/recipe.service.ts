import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { addIngredients } from '../shopping-list/store/shopping-list.actions';
import * as appStore from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeListChanged = new Subject<Recipe[]>();
  constructor(private store: Store<appStore.AppState>) {}
  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeListChanged.next(this.recipes.slice());
  }

  addIngredientsToshoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(addIngredients({ ingredients }));
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
