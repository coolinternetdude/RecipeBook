import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('inputName', { static: false }) nameInput: ElementRef;
  @ViewChild('inputAmount', { static: false }) amountInput: ElementRef;

  constructor(private shoppingService: ShoppingService) {}

  clearInputs() {
    this.nameInput.nativeElement.value = '';
    this.amountInput.nativeElement.value = '';
  }

  addIngredient(name: string, amount: number) {
    this.shoppingService.addIngredient({ name, amount });
    this.clearInputs();
  }
}
