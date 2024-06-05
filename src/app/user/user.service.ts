import { Injectable } from '@angular/core';
import { User } from '../type/user';

import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  uid: string = '';
  allUsers: any = [];
  user!: User | any;
  USER_KEY = '[user]';

  get isLogged(): boolean { 
    return !!this.user;
  }

  constructor(public auth: Auth, private fs: Firestore) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (err) {
      // this.user = undefined;
    }
   }

   register(email: string, name: string, password: string): void {
    createUserWithEmailAndPassword(this.auth, email, password)
.then((userCredential) => {
  const user = userCredential.user;
  this.uid = userCredential.user.uid;

  this.user = {
    email: email,
    name: name,
    id: this.uid,
  }

  this.createUser(this.user);

  localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
  
  alert('user created!');
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;

  alert(errorMessage);
});

}

login(email: string, password: string): void {
signInWithEmailAndPassword(this.auth, email, password)
.then((userCredential) => {
  const user = userCredential.user;
  this.uid = userCredential.user.uid;

  this.getUser().subscribe((addedUser) => {
    this.allUsers = addedUser;  
  });
  setTimeout(() => {
    this.user = this.allUsers.filter((x: User) => x.id === this.uid)[0]
    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user))},1000);
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;

  alert(errorMessage);
});
// console.log(this.uid);
// console.log('1');
// this.getUser().subscribe((addedUser) => {
//   this.allUsers = addedUser;
//   console.log('2');
//   // console.log(this.allUsers);
//   // this.user = this.allUsers.filter((x: User) => x.id === this.uid);
//   // localStorage.setItem(this.USER_KEY, JSON.stringify(this.user[0]));
// });
// console.log('3');
// // console.log(this.allUsers);
// this.user = this.allUsers.filter((x: User) => x.id === this.uid);
// localStorage.setItem(this.USER_KEY, JSON.stringify(this.user[0]));

}

logout(): void {

signOut(this.auth).then(() => {

}).catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;

  alert(errorMessage);
});

this.user = undefined;
localStorage.removeItem(this.USER_KEY);

}

createUser(user: User) {
  let userCollection = collection(this.fs, 'users');
  return addDoc(userCollection, user);
}

getUser() {
  // let userCollection = collection(this.fs, 'users'+id);
  let userCollection = collection(this.fs, 'users');
  return collectionData(userCollection);
}
}
