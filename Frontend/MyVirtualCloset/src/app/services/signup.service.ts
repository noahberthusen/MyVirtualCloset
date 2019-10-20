import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';


@Injectable({
    providedIn: 'root'
  })
  export class SignupService {  
    constructor(private http: HttpClient) { }
    
    signup(user: User) {
      return this.http.post<User>('https://localhost:44383/api/user/register', user);
    }
  }
  

