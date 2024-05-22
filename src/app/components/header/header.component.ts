import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loto-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule]
})
export class HeaderComponent {

  UserName: any;
  Balance: any;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.UserName = this.authService.getUsername();
      if (isLoggedIn) {
        this.authService.GetUserbyCode(this.authService.getUserId()).subscribe(
          user => {
            if (user) {
              this.authService.setBalance(user.balance);
              this.Balance = user.balance;
            } else {
              console.error('User Not Found');
            }
          },
          error => console.error('Error to get the user', error)
        );
      }
    });
    if(this.Balance == undefined){
      this.logOut();
    }
  }

  logOut() {
    this.UserName = null;
    sessionStorage.setItem('id', 'undefined');
    sessionStorage.setItem('name', 'undefined');
    sessionStorage.setItem('email', 'undefined');
    sessionStorage.setItem('balance', 'undefined');
  }
}