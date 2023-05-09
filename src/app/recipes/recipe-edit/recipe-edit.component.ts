import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {
  Form,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  subscription: Subscription;
  recipeForm: FormGroup;
  constructor(
    private currentRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.currentRoute.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.editMode = param['id'] ? true : false;
      this.initForm();
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit(): void {
    if (this.editMode) {
      this.recipeService.editRecipe(this.id, this.recipeForm.value);
    } else this.recipeService.addRecipe(this.recipeForm.value);
    this.router.navigate(['../'], { relativeTo: this.currentRoute });
  }

  reset() {
    this.recipeForm.reset();
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[0-9]+[1-9]*$/),
        ]),
      })
    );
  }

  deleteIngredient(row: number) {
    // (this.recipeForm.get('ingredients') as FormArray).controls.splice(row, 1);
    (this.recipeForm.get('ingredients') as FormArray).removeAt(row);
    // (this.recipeForm.get('ingredients') as FormArray).clear();
  }

  private initForm(): void {
    let defaultRecipe = {
      name: '',
      description: '',
      imagePath: '',
      ingredients: new FormArray([]),
    };
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      defaultRecipe.name = recipe.name;
      defaultRecipe.description = recipe.description;
      defaultRecipe.imagePath = recipe.imagePath;
      if (recipe['ingredients']) {
        for (let item of recipe.ingredients) {
          defaultRecipe.ingredients.push(
            new FormGroup({
              name: new FormControl(item.name, Validators.required),
              amount: new FormControl(item.amount, [
                Validators.required,
                Validators.pattern(/^[0-9]+[1-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(defaultRecipe.name, Validators.required),
      description: new FormControl(
        defaultRecipe.description,
        Validators.required
      ),
      imagePath: new FormControl(defaultRecipe.imagePath, Validators.required),
      ingredients: defaultRecipe.ingredients,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
