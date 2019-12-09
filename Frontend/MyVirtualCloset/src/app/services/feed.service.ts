import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor( private http: HttpClient ) {}

  viewAllFeedOutfits() {
    return this.http.get<any[][]>('https://localhost:44383/api/Outfit/viewFeed');
  }

  public getUsersUsername(id: string) {
    const formData = new FormData();
    formData.append('id', id);  //must be of type 'name'
  
    return this.http.post<string>('https://localhost:44383/api/User/get', formData);
  }
}
