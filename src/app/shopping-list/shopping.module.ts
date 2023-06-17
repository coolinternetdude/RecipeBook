import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShoppingEditComponent, ShoppingListComponent],
  imports: [
    RouterModule.forChild([
      {
        path: 'shoppinglist',
        component: ShoppingListComponent,
        children: [{ path: 'edit', component: ShoppingEditComponent }],
      },
    ]),
    CommonModule,
    FormsModule,
  ],
})
export class ShoppingModule {}
