import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  subscription: Subscription;
  constructor(private currentRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.currentRoute.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.editMode = param['id'] ? true : false;
      console.log(this.editMode);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
