import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OddsService {
  private values: { over: number, under: number }[] = [
    { over: 1.00, under: 0.00 }, //A
    { over: 1.04, under: 11.40 },//2
    { over: 1.14, under: 5.70 },//3
    { over: 1.27, under: 3.80 },//4
    { over: 1.43, under: 2.85 },//5
    { over: 1.63, under: 2.28 },//6
    { over: 1.90, under: 1.90 },//7
    { over: 2.28, under: 1.63 },//8
    { over: 2.85, under: 1.43 },//9
    { over: 3.80, under: 1.27 },//10
    { over: 5.70, under: 1.14 },//J
    { over: 11.40, under: 1.04 },//Q
    { over: 0.00, under: 1.00 },//K
  ];

  constructor() { }

  getOverValue(index: number): number {
    return this.values[index -1].over;
  }

  getUnderValue(index: number): number {
    return this.values[index -1].under;
  }
}
