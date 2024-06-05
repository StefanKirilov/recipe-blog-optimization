import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public auth: Auth, private userService: UserService, private router: Router) { }

  submitHandler(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const value: {email: string , password: string } = form.value;

    form.reset();

    this.userService.login(value.email, value.password);
    this.router.navigate(['/home']);
  }
}
