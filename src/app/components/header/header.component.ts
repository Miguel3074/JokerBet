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

      this.authService.getUsername().then(username => {
        this.UserName = username;
      });
      this.authService.getBalance().then(balance => {
        this.Balance = balance;
      });

      if (isLoggedIn) {
        this.authService.GetUserbyCode(this.authService.getUserId()).subscribe(
          user => {
            if (user) {
              this.authService.setBalance(user.balance);
            }
          }
        );
      }
    });
  }
  
  logOut() {
    this.UserName = null;
  }
}