import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Image } from '../models/Image';
import { Tag } from 'src/app/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class ClothingItemService {
  tags: string;
  constructor(private http: HttpClient) { }

  viewAllUsersClothes() {
    return this.http.get<Image[]>('http://coms-309-ks-7.misc.iastate.edu:8080/api/ClothingItem/viewAllUserClothes')
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

  searchForClothes(tagsArray: Tag[]) {
    const formData = new FormData();

    this.tags= this.tags+tagsArray[0].name;
    var i;
    for(i =1; i<tagsArray.length;i++){
      this.tags= this.tags+";"+tagsArray[i].name;
    }

    formData.append('tags', this.tags);

    // return this.http.get<Image[]>('http://coms-309-ks-7.misc.iastate.edu:8080/api/ClothingItem/search', formData)
    // .pipe(map(res => {
    //   let clothing: Image[] = [];
    //   res.forEach(obj => {
    //     let image = new Image();
    //     image.name = obj.name;
    //     image.tags = obj.tags;
    //     image.image = obj.image;
    //     clothing.push(image);
    //   });
    //   return clothing;
    // }));
  }
}
