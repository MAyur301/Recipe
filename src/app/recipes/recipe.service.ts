import {  Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { shoppingListService } from "../shopping-list/shopping-list.service";





@Injectable()
export class RecipeService{



 private recipes: Recipe []=[ new Recipe('A Test Recipe',
 'This is Simply A Test' ,
 'https://hips.hearstapps.com/hmg-prod/images/crepes-index-64347419e3c7a.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',[
       new Ingredient('Cheez',1),
       new Ingredient('Meat',2)
 ]),
 new Recipe('Another Test Recipe',
 'This is Simply a Test',
 'https://hips.hearstapps.com/hmg-prod/images/crepes-index-64347419e3c7a.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',[
  new Ingredient('panner',20),
  new Ingredient('Fries',50)
 ])];

  constructor(private slService: shoppingListService){

  }

getRecipes () {
return this.recipes.slice();
}

getRecipe(index:number)
{
   return this.recipes[index];
}
     addIngredientsToShoppingList(ingredients: Ingredient []){

        this.slService.addIngredients(ingredients);
     }
}

