import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShoppingEditComponent, ShoppingListComponent],
  imports: [ShoppingRoutingModule, CommonModule, FormsModule],
})
export class ShoppingModule {}
