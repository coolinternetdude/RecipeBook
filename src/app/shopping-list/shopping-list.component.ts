import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, ShoppingState } from './store/shopping-list.reducer';
import { startEditing } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  listIngredientSubscription: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingService.ingredients;
    // this.listIngredientSubscription =
    //   this.shoppingService.ingredientListChanged.subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
  }

  selectItem(index: number) {
    //this.shoppingService.selectedItem.next(index);
    this.store.dispatch(startEditing({ index }));
  }
}
