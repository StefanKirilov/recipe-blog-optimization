import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipeComponent } from './recipe/recipe.component';
import { DetailsComponent } from './details/details.component';
import { AuthActivate } from './core/guards/auth.activate';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path:'home',
    component: HomeComponent,
  },
  {
    path:'contact',
    component: ContactComponent,
  },
  {
    path: 'new-recipe',
    component: NewRecipeComponent,
    // canActivate: [AuthActivate],
  },
  {
    path: 'recipe',
    component: RecipeComponent,
  },
  {
    path: 'recipe/details/:id',
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
