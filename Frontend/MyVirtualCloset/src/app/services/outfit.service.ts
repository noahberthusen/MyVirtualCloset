import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClothingItem } from '../models/ClothingItem';
import { Tag } from 'src/app/models/Tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OutfitService {
  constructor(private http: HttpClient) {}

  public uploadOutfit(name:string): Observable<ClothingItem> {
    console.log("inside uploadOutfit");
  
    const formData = new FormData();
    formData.append('name',name);  //must be of type 'name'
  
    return this.http.post<ClothingItem>('https://localhost:44383/api/Outfit/create', formData);
  }

  viewAllUsersOutfits() {
    console.log("inside view all users outfits function");
    let outfits: ClothingItem[] = [];
    return this.http.get<ClothingItem[]>('https://localhost:44383/api/Outfit/viewByUser')
    .pipe(map(res => {
      console.log(res);
    //   res.forEach(obj => {
    //     let image = new ClothingItem();
    //     image.name = obj.name;
    //     image.tags = obj.tags;
    //     image.image = obj.image;
    //     image.id = obj.id;
    //     console.log(image);
    //     outfits.push(image);
      }));
      // return outfits;
    
  }
}





