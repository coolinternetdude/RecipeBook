import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ShoppingService {
  ingredientListChanged = new Subject<Ingredient[]>();
  selectedItem = new Subject<number>();
  private ingredientList: Ingredient[] = [
    new Ingredient('Apples', 2),
    new Ingredient('Tomatoes', 5),
    new Ingredient('Onion', 10),
  ];

  get ingredients() {
    return this.ingredientList.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredientList[index];
  }

  addIngredient(item: Ingredient): void {
    this.ingredientList.push(item);
    this.ingredientListChanged.next(this.ingredientList.slice());
  }

  editIngredient(index: number, ingredient: Ingredient): void {
    this.ingredientList[index] = ingredient;
    this.ingredientListChanged.next(this.ingredientList.slice());
  }

  deleteIngredient(index: number) {
    this.ingredientList.splice(index, 1);
    this.ingredientListChanged.next(this.ingredientList.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredientList.push(...ingredients);
    this.ingredientListChanged.next(this.ingredientList.slice());
  }
}
