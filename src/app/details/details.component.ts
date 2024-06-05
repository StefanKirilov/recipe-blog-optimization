import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ErrorObserver, Observable } from 'rxjs';
import { Food } from '../type/food';
import { User } from '../type/user';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  food: Food[] = [];
  id: string;
  foodList: Food[] = [];
  USER_KEY = '[user]';
  user!: User;
  userId: string = '';
  isUser: boolean = false;
  like: number = 0;
  userLike: string[] = [];
  isLike: boolean = false;
  haveLoginUser: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private apiService: ApiService, private router: Router){
    this.id = (this.activeRoute.snapshot.params['id']);
    
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';

      if (lsUser !== ''){
        this.user = JSON.parse(lsUser); 
        this.haveLoginUser = true;
      }   
          this.userId = this.user?.id;
 
    } catch (error: any) {
      alert(error.message);
    }
    
}

detailsFood() {
  const dataFood: Observable<any> = this.apiService.getFood();
  dataFood.subscribe((res) => {
    this.foodList = res
    this.food = this.foodList.filter((x) => x.id == this.id);
    
    this.like = this.food[0]?.likes;
    this.userLike = this.food[0]?.userLikes;

  //  console.log(this.userLike[0].split(','));
  // console.log(this.userLike);
    
     this.isLike = this.userLike[0]?.split(',').some((x) => x == this?.userId);
     

    if (this?.userId == this?.food[0]?.userId) { 
             
      this.isUser = true;
    }

  });

}

  delFood() {
   this.apiService.deleteFood(this.id);
   this.router.navigate(['/recipe']);
}

//FIXME 

likeFood() {
  this.like++;
  this.userLike.push(this.userId);
  // console.log(this.userLike[0].split(','));
  
  this.apiService.updateLikes(this.id, this.like);
  this.apiService.updateUserLike(this.id, this.userLike); 
  // console.log('hi');
  
}

unlikeFood() {
  this.like--;
  let newUserLike = [];
  newUserLike = this.userLike[0].split(',').filter(x => x != this.userId);
  
  this.apiService.updateLikes(this.id, this.like);
  this.apiService.updateUserLike(this.id, newUserLike); 
  
  // console.log('HI');
  
}

// 

ngOnInit(): void {
  this.detailsFood();
}


}
