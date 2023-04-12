import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
@Injectable({ providedIn: 'root' })
export class ShoppingService {
  ingredientListChanged = new EventEmitter<Ingredient[]>();

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
    this.ingredientListChanged.emit(this.ingredientList.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredientList.push(...ingredients);
    this.ingredientListChanged.emit(this.ingredientList.slice());
  }
}
