import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';
import { Food } from '../../type/food';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  USER_KEY = '[user]';
  user: any;
  foodList: Food[] = [];
  myFood: Food[] = [];
  likeFood: Food[] = [];
  userId: string = '';
  userName: string = '';

  constructor (private apiService: ApiService ) {
        try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser); 

          this.userId = this.user?.id;
          this.userName = this.user?.name;
          

    } catch (error: any) {
      alert(error.message);
    }
  }

  isLoading: boolean = true;

ngOnInit(): void { 
  this.refreshFood();
  this.myLikeFood();
  this.isLoading = false;  
}

refreshFood() {
  const dataFood: Observable<any> = this.apiService.getFood();
  dataFood.subscribe((res) => {
    this.foodList = res;   
    this.myFood = this.foodList.filter(x => x.userId == this.userId);
  })
}

myLikeFood() {
  const dataFood: Observable<any> = this.apiService.getFood();
  dataFood.subscribe((res) => {
    this.foodList = res;  

        this.likeFood = this.foodList.filter(x => x.userLikes[0]?.split(',').find(u => u == this.userId));
        
  })
  // setTimeout(() => {
  //   console.log(this.foodList);
  // }, 1000)
  
}
}
