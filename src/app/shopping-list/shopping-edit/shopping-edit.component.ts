import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  addIngredient,
  deleteIngredient,
  editIngredient,
  stopEditing,
} from '../store/shopping-list.actions';
import * as appStore from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingForm', { static: false }) shoppingForm: NgForm;
  subscription: Subscription;
  item: Ingredient;
  editMode: boolean = false;
  constructor(private store: Store<appStore.AppState>) {}

  addIngredient(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (!this.editMode) {
      this.store.dispatch(addIngredient({ ingredient: newIngredient }));
      form.reset();
    } else {
      this.store.dispatch(editIngredient({ ingredient: newIngredient }));
      form.reset();
      this.editMode = false;
    }
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((storeData) => {
        if (storeData.editedIngredientIndex > -1) {
          this.item = storeData.editedIngredient;
          this.editMode = true;
          if (this.item) {
            this.shoppingForm.setValue({
              name: this.item.name,
              amount: this.item.amount,
            });
          }
        } else this.editMode = false;
      });
    // this.subscription = this.shoppingService.selectedItem.subscribe((index) => {
    //   this.item = this.shoppingService.getIngredient(index);

    //   this.index = index;
    // });
  }

  deleteItem() {
    // this.shoppingService.deleteIngredient(this.index);
    this.store.dispatch(deleteIngredient());
    this.clearForm();
  }

  clearForm() {
    //this.shoppingForm.reset();
    this.shoppingForm.setValue({ name: '', amount: '' });
    this.store.dispatch(stopEditing());
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(stopEditing());
  }
}
