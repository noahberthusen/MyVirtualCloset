import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor( private http: HttpClient ) {}

  viewAllFeedOutfits() {
    return this.http.get<any[][]>('http://coms-309-ks-7.misc.iastate.edu:8080/api/Outfit/viewFeed');
  }

  public getUsersUsername(id: string) {
    const formData = new FormData();
    formData.append('id', id);  //must be of type 'name'
  
    return this.http.post<User>('http://coms-309-ks-7.misc.iastate.edu:8080/api/User/get', formData);
  }
}
