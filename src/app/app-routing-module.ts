import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { SelectRecipeComponent } from './recipes/select-recipe/select-recipe.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { recipeResolver } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { authGuardFn } from './auth/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full',
  },
  {
    path: 'shoppinglist',
    component: ShoppingListComponent,
    children: [{ path: 'edit', component: ShoppingEditComponent }],
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [authGuardFn],
    children: [
      {
        path: '',
        component: SelectRecipeComponent,
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: { recipe: recipeResolver },
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: { recipe: recipeResolver },
      },
    ],
  },
  {
    path: 'signin',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
