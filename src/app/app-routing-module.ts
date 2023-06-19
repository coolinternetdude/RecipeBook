import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const defaultRoute = localStorage.getItem('user') ? '/recipes' : '/signin';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: defaultRoute,
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((mod) => mod.RecipesModule),
  },
  {
    path: 'shoppinglist',
    loadChildren: () =>
      import('./shopping-list/shopping.module').then(
        (mod) => mod.ShoppingModule
      ),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
