import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  checkElement : any;

  constructor(private userService: UserService, private router:Router, private elRef: ElementRef){}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngAfterViewInit(): void {
    this.ModifyHeader();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
  }

  uncheck(): void {
    this.checkElement = document.querySelector('#check');
    this.checkElement.checked = false;
  }

  ModifyHeader() : void
  { 
    let header = this.elRef.nativeElement.querySelector(`.header`);
    
    document.addEventListener('scroll', () => {
      if (window.scrollY > 250) {
        header.classList.add('scrolled');
        console.log('scrolled');
        
      } else {
        header.classList.remove('scrolled');
      }
    })
  } 

}
