import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  ngOnInit(): void {
    this.currentRoute.params.subscribe((res: Params) => {
      this.id = +res['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }
  constructor(
    private recipeService: RecipeService,
    private currentRoute: ActivatedRoute
  ) {}
  addIngredientToShoppingList() {
    this.recipeService.addIngredientsToshoppingList(this.recipe.ingredients);
  }
}
