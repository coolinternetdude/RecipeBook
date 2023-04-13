import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {}
  addIngredientToShoppingList() {
    this.recipeService.addIngredientsToshoppingList(this.recipe.ingredients);
  }

  editRecipe() {
    this.router.navigate(['edit'], {
      relativeTo: this.currentRoute,
    });
    // this.router.navigate(['recipes', this.id, 'edit']);
    // this.router.navigate(['../', this.id, 'edit'], {
    //   relativeTo: this.currentRoute,
    // });
  }
}
