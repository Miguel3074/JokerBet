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
  betAmount!: number;
  bettingValue!: number;
  odds: OddsService;

  constructor(odds: OddsService,public authSrvc: AuthService) {
    this.odds = odds;
    this.buildDeck();
    this.playing = false;
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
    this.authSrvc.setBalance(+(this.authSrvc.getBalance() - this.betAmount).toFixed(2));
    this.bettingValue = this.betAmount;
    this.randomizeCard();
  }


  withdraw() {
    this.authSrvc.setBalance(+(this.authSrvc.getBalance() + this.bettingValue).toFixed(2));
    this.bettingValue = 0;
    this.playing = false;
  }

  checkUnder() {
    this.currentValue = this.newValue;
    this.randomizeCard()

    if (this.currentValue < this.newValue) {
      this.bettingValue = 0;
      this.playing = false;
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
    }
    else if (this.currentValue < this.newValue) {
      this.bettingValue = +((this.bettingValue * this.odds.getOverValue(this.currentValue)).toFixed(2));
    }
  }
}
