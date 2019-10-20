import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Image } from '../models/Image';

@Injectable({
  providedIn: 'root'
})
export class ClothingItemService {

  constructor(private http: HttpClient) { }

  viewAllUsersClothes() {
    return this.http.get<Image[]>('https://localhost:44383/api/ClothingItem/viewAllUserClothes')
    .pipe(map(res => {
      let clothing: Image[] = [];
      res.forEach(obj => {
        let image = new Image();
        image.name = obj.name;
        image.tags = obj.tags;
        image.image = obj.image;
        clothing.push(image);
      });
      return clothing;
    }));
  }

  searchForClothes(tag) {
    const formData = new FormData();
    formData.append('tags', tag);
    return this.http.post('https://localhost:44383/api/ClothingItem/search', formData);
  }
}
