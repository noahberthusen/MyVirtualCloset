import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ClothingItem } from '../models/ClothingItem';
import { Tag } from 'src/app/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class ClothingItemService {
  tags: string;
  constructor(private http: HttpClient) { }

  viewAllUsersClothes() {
    console.log("inside view all users clothes function");
    let clothing: ClothingItem[] = [];
    return this.http.get<ClothingItem[]>('https://localhost:44383/api/ClothingItem/viewAllUserClothes')
    .pipe(map(res => {
      //TODO: the array of images coming in is all of the same image.. confirm that endpoint returns correctly
      res.forEach(obj => {
        let image = new ClothingItem();
        image.name = obj.name;
        image.tags = obj.tags;
        image.image = obj.image;
        image.id = obj.id;
        console.log(image);
        clothing.push(image);
      });
      // console.log(res.length);
      // console.log(res[20]);
      // clothing.push(res[20]);
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

    // return this.http.get<Image[]>('https://localhost:44383/api/ClothingItem/search', formData)
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
