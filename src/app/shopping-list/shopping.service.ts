import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ShoppingService {
  ingredientListChanged = new Subject<Ingredient[]>();

  private ingredientList: Ingredient[] = [
    new Ingredient('Apples', 2),
    new Ingredient('Tomatoes', 5),
    new Ingredient('Onion', 10),
  ];
  get ingredients() {
    return this.ingredientList.slice();
  }
  addIngredient(item: Ingredient) {
    this.ingredientList.push(item);
    this.ingredientListChanged.next(this.ingredientList.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredientList.push(...ingredients);
    this.ingredientListChanged.next(this.ingredientList.slice());
  }
}
