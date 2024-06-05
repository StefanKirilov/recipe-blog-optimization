import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { UserModule } from './user/user.module';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipeComponent } from './recipe/recipe.component';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from './shared/shared.module';
import { ErrorComponent } from './error/error.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


const firebaseConfig = {
  apiKey: "AIzaSyCgxJ8yQsJ-KxMLsutPKl5606av4OY5cjg",
  authDomain: "recipe-blog-bede4.firebaseapp.com",
  projectId: "recipe-blog-bede4",
  storageBucket: "recipe-blog-bede4.appspot.com",
  messagingSenderId: "395010172487",
  appId: "1:395010172487:web:859d2d6d5c59fc4f47f362"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    NewRecipeComponent,
    RecipeComponent,
    DetailsComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    UserModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
