import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Console } from 'console';

@Component({
  selector: 'app-loto-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule]
})
export class HeaderComponent {

  username: any;
  balance: any;
  private subscriptions: Subscription[] = [];

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.getBalanceO().subscribe(balance => {
        this.balance = balance;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  
  logOut() {
    this.username = null;
    this.ngOnDestroy()
  }
}