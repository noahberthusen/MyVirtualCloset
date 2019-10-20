import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';


@Injectable({
    providedIn: 'root'
  })
  export class SignupService {  
    constructor(private http: HttpClient) { }
    
    signup(user: User) {
      return this.http.post<User>('http://coms-309-ks-7.misc.iastate.edu:8080/api/user/register', user);
    }
  }
  

