import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient,
      private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User) {
    console.log("inside auth service");
    return this.http.post<User>('http://coms-309-ks-7.misc.iastate.edu:8080/api/auth/login', user)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  forgotPassword(user: User) {
    return this.http.post<any>('http://coms-309-ks-7.misc.iastate.edu:8080/api/auth/forgot', user);
  }

  changePassword(user: User) {
    return this.http.post<any>('http://coms-309-ks-7.misc.iastate.edu:8080/api/auth/reset', user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    if (this.currentUserSubject.value) {
      return true;
    } else {
      return false;
    }
  }
}
