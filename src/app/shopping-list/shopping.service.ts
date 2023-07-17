import { Injectable, inject } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  deleteIngredient,
  editIngredient,
} from './store/shopping-list.actions';
@Injectable({ providedIn: 'root' })
export class ShoppingService {
  store = inject(Store);
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
    this.store.dispatch(editIngredient({ id: index, ingredient: ingredient }));
  }

  deleteIngredient(index: number) {
    // this.store.dispatch(deleteIngredient({ id: index }));
    // this.ingredientList.splice(index, 1);
    // this.ingredientListChanged.next(this.ingredientList.slice());
  }
}
