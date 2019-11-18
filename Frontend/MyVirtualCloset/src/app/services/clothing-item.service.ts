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
    console.log("inside view all users clothes function");
    let clothing: Image[] = [];
    return this.http.get<Image[]>('http://coms-309-ks-7.misc.iastate.edu:8080/api/ClothingItem/viewAllUserClothes')
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

  searchForClothes(myTag: string) {

    console.log("inside of searchForClothes");
    const formData = new FormData();

    this.tags= myTag;

    formData.append('tags', this.tags);

    return this.http.post<Image[]>('http://coms-309-ks-7.misc.iastate.edu:8080/api/ClothingItem/search', formData)
    .pipe(map(res => {
<<<<<<< Updated upstream
      console.log("made post call to search using a tag");
      console.log(res);
      let clothing: Image[] = [];
=======
      console.log('i hate this')
      console.log(res);
      let clothing: ClothingItem[] = [];
>>>>>>> Stashed changes
      res.forEach(obj => {
        let image = new Image();
        if (obj != null){
          image.name = obj.name;
          image.tags = obj.tags;
          image.image = obj.image;
          clothing.push(image);
        }
      });
      return clothing;
    }));
  }
}
