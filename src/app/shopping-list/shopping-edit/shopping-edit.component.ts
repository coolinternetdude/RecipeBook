import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';

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
  index: number;
  constructor(private shoppingService: ShoppingService) {}

  addIngredient(form: NgForm) {
    if (!this.editMode) {
      const ingredient = new Ingredient(form.value.name, form.value.amount);
      this.shoppingService.addIngredient(ingredient);
      form.reset();
    } else {
      this.shoppingService.editIngredient(this.index, {
        name: form.value.name,
        amount: form.value.amount,
      });
      form.reset();
      this.editMode = false;
    }
  }

  ngOnInit(): void {
    this.subscription = this.shoppingService.selectedItem.subscribe((index) => {
      this.item = this.shoppingService.getIngredient(index);
      this.editMode = true;
      this.index = index;
      if (this.item) {
        this.shoppingForm.setValue({
          name: this.item.name,
          amount: this.item.amount,
        });
      }
    });
  }

  deleteItem() {
    this.shoppingService.deleteIngredient(this.index);
    this.clearForm();
  }

  clearForm() {
    //this.shoppingForm.reset();
    this.shoppingForm.setValue({ name: '', amount: '' });
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
