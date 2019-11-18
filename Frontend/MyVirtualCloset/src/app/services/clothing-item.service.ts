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
    return this.http.get<ClothingItem[]>('http://coms-309-ks-7.misc.iastate.edu:8080/api/ClothingItem/viewAllUserClothes')
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

  searchForClothes(myTag: string) {

    console.log("inside of searchForClothes");
    const formData = new FormData();

    this.tags= myTag;

    formData.append('tags', this.tags);

    return this.http.post<ClothingItem[]>('http://coms-309-ks-7.misc.iastate.edu:8080/api/ClothingItem/search', formData)
    .pipe(map(res => {
<<<<<<< HEAD
<<<<<<< Updated upstream
      console.log("made post call to search using a tag");
      console.log(res);
      let clothing: Image[] = [];
=======
      console.log('i hate this')
      console.log(res);
      let clothing: ClothingItem[] = [];
>>>>>>> Stashed changes
=======
      let clothing: ClothingItem[] = [];
>>>>>>> 2f991f9df372274cef932b05761f88a2e39f1b95
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

    return this.http.post<ClothingItem>('http://coms-309-ks-7.misc.iastate.edu:8080/api/ClothingItem/getById', formData)
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
