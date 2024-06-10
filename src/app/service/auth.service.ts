import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy, OnInit {

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$: Observable<any> = this.currentUserSubject.asObservable();
  UserId!: number;
  blnc!: number;
  UsrNm!: string;
  private balanceSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    let userId = this.getUserId();
    if (userId) {
      this.GetUserbyCode(userId).subscribe(user => {
        this.blnc = user.balance;
      });
    }
  }
  apiurl = 'http://localhost:3000/user';

  ngOnInit() {
    let userId = this.getUserId();
    if (userId) {
      this.GetUserbyCode(userId).subscribe(user => {
        this.blnc = user.balance;
      });
    }
  }

  ngOnDestroy() {
    this.loggedInSubject.complete();
    this.currentUserSubject.complete();
    this.balanceSubject.complete();
  }

  RegisterUser(inputdata: any) {
    return this.http.post(this.apiurl, inputdata);
  }

  setUserId(id: number) {
    this.UserId = id;
  }

  getUserId() {
    return this.UserId;
  }

  GetUserbyCode(id: any) {
    return this.http.get<any[]>(this.apiurl).pipe(
      map(users => users.find(user => user.id === id))
    );
  }

  Getall() {
    return this.http.get(this.apiurl);
  }

  updateuser(id: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + id, inputdata);
  }

  getuserrole() {
    return this.http.get('http://localhost:3000/role');
  }

  isloggedin() {
    return this.loggedInSubject.value;
  }

  setUsername(name: any) {
    this.UsrNm = name;
  }

  setLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }

  setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
    this.UserId = user.id;
  }

  setBalance(blnc: any) {
    const userId = this.getUserId();
    this.balanceSubject.next(blnc);
    this.blnc = blnc;
    if (userId) {
      this.GetUserbyCode(userId).subscribe(user => {
        if (user) {
          user.balance = blnc;
          this.updateuser(userId, user).subscribe(
            () => {
              this.currentUserSubject.next(user);
            }
          );
        }
      });
    }
  }

  getUsername(): string {
    return this.UsrNm;
  }

  getBalance(): number {
    return this.blnc;
  }

  getBalanceO() {
    let userId = this.getUserId();
    if (userId) {
      this.GetUserbyCode(userId).subscribe(user => {
        this.blnc = user.balance;
      });
    }
    return this.balanceSubject.asObservable();
  }

  logOut() {
    this.setLoggedIn(false);
    this.setUserId(0);
    this.setBalance(0);
    this.setUsername("");
    this.setCurrentUser(null);
  }
}
