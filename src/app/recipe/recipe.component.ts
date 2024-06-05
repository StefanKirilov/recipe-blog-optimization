import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';
import { Food } from '../type/food';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnInit {

  constructor (private apiService: ApiService ) {}

  isLoading: boolean = true;
  foodList: Food[] = [];
  filteredFoodList: Food[] = [];
  searchField: boolean = false;
  searching: string = '';

  ngOnInit (): void {
    this.refreshFood();
  };


  refreshFood() {
    const dataFood: Observable<any> = this.apiService.getFood();
    dataFood.subscribe((res) => {

      this.foodList = res; 
      this.isLoading = false;  
    })
  }

  searchFood(form: NgForm ): void {
    if (form.invalid) {
      return;
    }
    const { search } = form.value;       
    this.filterResults(search);
    form.reset(); 
    
  }

  filterResults(text: string) {
    if (!text) {
      this.refreshFood();
      this.searchField = false; 
      return;
    }
    this.filteredFoodList = this.foodList.filter(
      housingLocation => housingLocation?.name.toLowerCase().includes(text.toLowerCase())
    );
    this.foodList = this.filteredFoodList;  
    this.searchField = true; 
    this.searching = text;
    console.log(this.searching);
    
  }
} 

