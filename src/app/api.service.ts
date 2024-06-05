import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Food } from './type/food';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

// likes!: number;
// userLikes!: string[];

  constructor(private fs: Firestore) {}

  addFood( name: string , time: string, count: number, products: string, way: string, image: string, userId: string, likes: number, userLikes: string[] ){
    let data = { name, time, count, products, way, image, userId, likes, userLikes };
    let foodCollection = collection(this.fs, 'food');
    return addDoc(foodCollection, data);
  }

  getFood(){
    let foodCollection = collection(this.fs, 'food');
    return collectionData(foodCollection, {idField: 'id'});
  }

  deleteFood(id: string){
    const docRef = doc(this.fs, 'food/'+id); 
     return deleteDoc(docRef);

     } 

  updateLikes( id: string, like: number){
    const docRef = doc(this.fs, 'food/'+id); 
    return updateDoc(docRef, {likes: `${like}`});
  }

  updateUserLike( id: string, userLikes: string[]){
    const docRef = doc(this.fs, 'food/'+id); 
    return updateDoc(docRef, {userLikes: [`${userLikes}`]});
  }

}
