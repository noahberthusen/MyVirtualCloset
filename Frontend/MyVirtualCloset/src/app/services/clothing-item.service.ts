import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Image } from '../models/Image';
import { Tag } from 'src/app/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class ClothingItemService {
  tag: string;
  constructor(private http: HttpClient) { }

  viewAllUsersClothes() {
    console.log("inside view all users clothes function");
    let clothing: Image[] = [];
    return this.http.get<Image[]>('https://localhost:44383/api/ClothingItem/viewAllUserClothes')
    .pipe(map(res => {
      //TODO: the array of images coming in is all of the same image.. confirm that endpoint returns correctly
      res.forEach(obj => {
        let image = new Image();
        image.name = obj.name;
        image.tags = obj.tags;
        image.image = obj.image;
        console.log(image);
        clothing.push(image);
      });
      // console.log(res.length);
      // console.log(res[20]);
      // clothing.push(res[20]);
      return clothing;
    }));
  }

  searchForClothes(searchTag: string) {

    //CURRENTLY SEARCHES BY ONE TAG ONLY
    // this.tag= this.tag+tagsArray[0].name;
    // var i;
    // for(i =1; i<tagsArray.length;i++){
    //   this.tag= this.tag+";"+tagsArray[i].name;
    // }

    return this.http.post<Image[]>('https://localhost:44383/api/ClothingItem/search', searchTag)
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
}
