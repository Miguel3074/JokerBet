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

  isLoggedIn: boolean = false;
  UserName: any;

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.UserName = this.authService.getUsername();
      if(isLoggedIn){
        this.authService.GetUserbyCode(this.authService.getUserId()).subscribe(
          user => {
            if (user) {
              this.authService.setBalance(user.balance);
            } else {
              console.error('User Not Found');
            }
          },
          error => console.error('Error to get the user', error)
        );
      }
    });
  }

  constructor(public authService: AuthService) {
  }

}