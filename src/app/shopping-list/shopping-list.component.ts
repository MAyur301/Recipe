import { shoppingListService } from './shopping-list.service';
import { Component,OnDestroy,OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy{

  ingredients : Ingredient [];

   private igChangesub : Subscription;

  constructor(private slService: shoppingListService){}

  ngOnInit(){
                 this.ingredients = this.slService.getIngredients();
                this.igChangesub = this.slService.ingredientsChanged.subscribe((ingredients : Ingredient [])=>{this.ingredients=ingredients});
  }

 ngOnDestroy() {

  this.igChangesub.unsubscribe();

 }
 onEditItem(index:number)
 {
     this.slService.startedEditing.next(index);
 }
}
