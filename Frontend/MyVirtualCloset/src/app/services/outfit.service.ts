import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClothingItem } from '../models/ClothingItem';
import { Tag } from 'src/app/models/Tag';
import { map } from 'rxjs/operators';
import { Outfit } from '../models/Outfit';

@Injectable({
  providedIn: 'root'
})
export class OutfitService {
  constructor(private http: HttpClient) {}

  public uploadOutfit(name:string): Observable<ClothingItem> {
    console.log("inside uploadOutfit");
  
    const formData = new FormData();
    formData.append('name',name);  //must be of type 'name'
  
    return this.http.post<ClothingItem>('http://coms-309-ks-7.misc.iastate.edu:8080/api/Outfit/create', formData);
  }

  viewAllUsersOutfits() {
    console.log("inside view all users outfits function");
    
    return this.http.get<any[][]>('http://coms-309-ks-7.misc.iastate.edu:8080/api/Outfit/viewByUser');
  }

}



