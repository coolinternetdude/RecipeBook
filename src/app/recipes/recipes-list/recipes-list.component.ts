import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipeListChanged.subscribe(
      (newRecipeList: Recipe[]) => {
        this.recipes = newRecipeList;
      }
    );
  }

  createRecipe() {
    this.router.navigate(['new'], { relativeTo: this.currentRoute });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
