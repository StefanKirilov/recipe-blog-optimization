import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { MinCountDirective } from './min-count.directive';
import { MaxCountDirective } from './max-count.directive';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MinCountDirective,
    MaxCountDirective
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    SharedModule,
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ]
})
export class UserModule { }
