import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input() item: Recipe;

  constructor(private recipeService: RecipeService) {}

  itemSelected() {
    this.recipeService.selectedRecipe.emit(this.item);
  }
}
