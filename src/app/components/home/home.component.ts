import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { OddsService } from '../../service/odds-service.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule, RouterModule]
})
export class HomeComponent {

  deck: string[] = [];
  values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  types = ["C", "E", "O", "P"];
  currentValue!: number;
  newValue!: number;
  randomCard!: string;
  playing: boolean = false;
  lost: boolean = false;
  betAmount!: number;
  bettingValue!: number;
  odds: OddsService;
  balance: number | null = null;

  constructor(odds: OddsService, public authSrvc: AuthService) {
    this.odds = odds;
    this.buildDeck();
    this.playing = false;
    this.authSrvc.getBalance().then((balance: number) => {
      this.balance = balance;
    });
  }

  buildDeck(): void {
    for (let i = 0; i < this.values.length; i++) {
      for (let j = 0; j < this.types.length; j++) {
        this.deck.push(`${this.values[i]}-${this.types[j]}`);
      }
    }
  }

  randomizeCard(): void {
    const randomIndex = Math.floor(Math.random() * this.deck.length);
    this.randomCard = this.deck[randomIndex];
    this.newValue = Math.floor(randomIndex / 4) + 1;
  }

  play() {
    this.playing = true;
    this.lost = false;
    this.authSrvc.getBalance().then((balance: number) => {
      this.authSrvc.setBalance(+(balance - this.betAmount).toFixed(2));
    });
    this.bettingValue = this.betAmount;
    this.randomizeCard();
  }

  checkBetAmountValidity() {
    return this.betAmount !== null && this.betAmount >= 0.75 && this.balance !== null && this.betAmount <= this.balance && this.authSrvc.isloggedin();
  }

  checkBalance() {
    return this.balance !== null && this.betAmount <= this.balance;
  }

  withdraw() {
    this.authSrvc.getBalance().then((balance: number) => {
      this.authSrvc.setBalance(+(balance + this.bettingValue).toFixed(2));
      this.bettingValue = 0;
      this.playing = false;
    });
  }

  checkUnder() {
    this.currentValue = this.newValue;
    this.randomizeCard()

    if (this.currentValue < this.newValue) {
      this.bettingValue = 0;
      this.playing = false;
      this.lost = true;
    }
    else if (this.currentValue > this.newValue) {
      this.bettingValue = +((this.bettingValue * this.odds.getUnderValue(this.currentValue)).toFixed(2));
    }
  }

  checkOver() {
    this.currentValue = this.newValue;
    this.randomizeCard()

    if (this.currentValue > this.newValue) {
      this.bettingValue = 0;
      this.playing = false;
      this.lost = true;
    }
    else if (this.currentValue < this.newValue) {
      this.bettingValue = +((this.bettingValue * this.odds.getOverValue(this.currentValue)).toFixed(2));
    }
  }
}
