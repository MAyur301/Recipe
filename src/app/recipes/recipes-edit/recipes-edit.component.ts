import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css'],
})
export class RecipesEditComponent implements OnInit {
  id: number;
  editmode = false;
  recipeForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editmode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = ' ';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editmode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;

      if (recipe['ingredients']) {
        for (let ingredients of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredients.name,Validators.required),
              amount: new FormControl(ingredients.amount,[Validators.required,Validators.pattern(/ ^[1-9]+[0-9]*$  / )]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName,Validators.required),
      imagepath: new FormControl(recipeImagePath,Validators.required),
      description: new FormControl(recipeDescription,Validators.required),
      ingredients: recipeIngredients
    });
  }

  onsubmit() {
    console.log(this.recipeForm.value);
  }
  data()
  {
      return (this.recipeForm.get('ingredients') as FormArray).controls
  }
  onAddIngredient()
  {
    (  <FormArray> this.recipeForm.get('ingredients')).push(new FormGroup({
        name: new FormControl(null,Validators.required),
        amount: new FormControl(null,[Validators.required,Validators.pattern(/ ^[1-9]+[0-9]*$  / )])
    }))
  }
}
