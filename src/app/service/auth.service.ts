import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$: Observable<any> = this.currentUserSubject.asObservable();
  UserId!: number;

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/user';

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

  setLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }

  setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
    this.UserId = user.id;
  }

  setBalance(blnc: any) {
    const userId = this.getUserId();
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

  getUsername() {
    return new Promise((resolve) => {
      let userId = this.getUserId();
      if (userId) {
        this.GetUserbyCode(userId).subscribe(user => {
          if (user) {
            resolve(user.name);
          }
        });
      }
    });
  }

  getBalance(): Promise<number> {
    return new Promise((resolve) => {
      let userId = this.getUserId();
      if (userId) {
        this.GetUserbyCode(userId).subscribe(user => {
          if (user) {
            resolve(user.balance);
          }
        });
      }
    });
  }
}
