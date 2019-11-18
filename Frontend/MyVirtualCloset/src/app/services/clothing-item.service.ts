import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Tag } from 'src/app/models/Tag';
import { ClothingItem } from 'src/app/models/ClothingItem';

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

  searchForClothes(myTag: string) {

    console.log("inside of searchForClothes");
    const formData = new FormData();

    this.tags= myTag;

    formData.append('tags', this.tags);

    return this.http.post<ClothingItem[]>('https://localhost:44383/api/ClothingItem/search', formData)
    .pipe(map(res => {
      console.log("made post call to search using a tag");
      console.log(res);
      let clothing: ClothingItem[] = [];
      res.forEach(obj => {
        let image = new ClothingItem();
        if (obj != null){
          image.name = obj.name;
          image.tags = obj.tags;
          image.image = obj.image;
          image.id = obj.id;
          clothing.push(image);
        }
      });
      return clothing;
    }));
  }

  searchClothingItemId(myId: string) {
    const formData = new FormData();
    formData.append('id', myId);

    return this.http.post<ClothingItem>('https://localhost:44383/api/ClothingItem/getById', formData)
    .pipe(map(res => {
      let cloth = new ClothingItem();
      cloth.name = res.name;
      cloth.tags = res.tags;
      cloth.id = res.id;
      cloth.image = res.image;
      return cloth;
    }));
  }
}
