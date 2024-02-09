import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';

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
    private recipeService: RecipeService,
    private router:Router
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
            // const newRecipe = new Recipe(this.recipeForm.value['name'],
            // this.recipeForm.value['description'],
            // this.recipeForm.value['imagepath'],
            // this.recipeForm.value['ingredients']);
           if(this.editmode)
           {
              this.recipeService.updateRecipe(this.id,this.recipeForm.value);
           }
           else{
            this.recipeService.addRecipe(this.recipeForm.value);
           }
           this.onCancle();
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
  onCancle()
  {
         this.router.navigate(['../'],{relativeTo:this.route})
  }
  ondelte(index: number)
  {
       (<FormArray> this.recipeForm.get('ingredients')).removeAt(index)
  }
}
