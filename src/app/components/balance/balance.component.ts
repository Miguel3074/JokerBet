import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule, RouterModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss'
})
export class BalanceComponent {
  amountD!: number;
  amountW!: number;
  balance!: number;
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

  Deposit(value: number){
    this.authService.setBalance(+this.authService.getBalance() + value);
  }

  Withdraw(value: number){
    this.authService.setBalance(+this.authService.getBalance() - value);
  }

}
