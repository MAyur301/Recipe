import { NgForm } from '@angular/forms';
import { shoppingListService } from '../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy{
  @ViewChild('f') slForm:NgForm
  subscription : Subscription
   editMode = false;
   editedItemIndex:number;
   editedItem:Ingredient;
   constructor(private slService:shoppingListService){

   }
   ngOnInit() {
         this.subscription =    this.slService.startedEditing.subscribe((index: number) => {
          this.editedItemIndex = index;
          this.editMode=true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name:this.editedItem.name,
            amount:this.editedItem.amount
          })
         });
   }
  onsubmit(form:NgForm){

     const value=form.value
     const newIngredient = new Ingredient(value.name,value.amount);
     if(this.editMode)
     {
       this.slService.updateIngredient(this.editedItemIndex,newIngredient);
     }
     else
     {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset()
     }
     onclear()
     {
         this.slForm.reset();
         this.editMode = false;
     }
     ondelete()
     {
       this.slService.deleteIngredient(this.editedItemIndex)
      this.slForm.reset();
     }

 ngOnDestroy() {

               this.subscription.unsubscribe();
 }
}
