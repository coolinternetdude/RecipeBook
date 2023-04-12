import { Component } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
})
export class RecipesComponent {
  selectedRec: Recipe;

  constructor(private recipeService: RecipeService) {
    this.recipeService.selectedRecipe.subscribe((recipe: Recipe) => {
      this.selectedRec = recipe;
    });
  }
}
