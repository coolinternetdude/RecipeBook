import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShoppingEditComponent, ShoppingListComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ShoppingListComponent,
        children: [{ path: 'edit', component: ShoppingEditComponent }],
      },
    ]),
    SharedModule,
    FormsModule,
  ],
})
export class ShoppingModule {}
