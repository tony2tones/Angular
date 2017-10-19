import { Component, OnInit } from '@angular/core';

import { Recipe }  from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is just a test','http://whitneybond.com/wp-content/uploads/2016/02/Bacon_Wrapped_Meatloaf_18.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
