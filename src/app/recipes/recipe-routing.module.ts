import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { SelectRecipeComponent } from './select-recipe/select-recipe.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { authGuardFn } from '../auth/auth.guard';
import { recipeResolver } from './recipes-resolver.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
