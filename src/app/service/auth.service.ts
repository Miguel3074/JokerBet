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
  private balance!: number;


  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/user'

  RegisterUser(inputdata: any) {
    return this.http.post(this.apiurl, inputdata)
  }

  getUserId() {
    return sessionStorage.getItem('id');
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

  getUsername() {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('name');
    }
    return null;
  }

  isloggedin() {
    if (typeof sessionStorage !== 'undefined') {
      if (this.getUsername()) {
        return true;
      }
    }
    return false;
  }

  setLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }

  setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
  }

  setBalance(blnc: any) {
    this.balance = blnc;
  }

  getBalance() {
    return this.balance;
  }
}