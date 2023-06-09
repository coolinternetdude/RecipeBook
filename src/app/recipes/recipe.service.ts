import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeListChanged = new Subject<Recipe[]>();
  constructor(private Shopping: ShoppingService) {}
  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Big Tasty',
  //     'MacDonald Big Tasty',
  //     'https://www.mcdonalds.com.mt/wp-content/uploads/2018/05/BigTasty-Classic.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Tomatoes', 1),
  //       new Ingredient('Onion', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'Spaghetti bolognese',
  //     'Italian Spaghetti With tomato sauce',
  //     'https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg',
  //     [
  //       new Ingredient('Spaghetti pasta', 250),
  //       new Ingredient('Canned Tomato Sauce', 1),
  //       new Ingredient('Parsley', 2),
  //     ]
  //   ),
  // ];

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
    this.Shopping.addIngredients(ingredients);
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
