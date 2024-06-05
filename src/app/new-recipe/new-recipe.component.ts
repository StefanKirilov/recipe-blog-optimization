import { Component, ErrorHandler } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Food } from '../type/food';
import { User } from '../type/user';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export class NewRecipeComponent {

  food: Food | undefined;
  USER_KEY = '[user]';
  user!: User;
  userId!: string;
  likes: number = 0;
  userLikes: string[] = [];

  constructor(public auth: Auth, private apiService: ApiService, private router: Router) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);

          this.userId = this.user?.id;

       
    } catch (error: any) {
      alert(error.message);
    }

   }

  submitHandler(form: NgForm ): void {
    if (form.invalid) {
      return;
    }
  
    const value: {name: string , time: string, count: number, products: string, way: string, image: string } = form.value;
    form.reset();   

    this.apiService.addFood( value.name, value.time, value.count, value.products,value.way, value.image, this.userId, this.likes, this.userLikes );
  
    this.router.navigate(['/recipe']);
  }
}
