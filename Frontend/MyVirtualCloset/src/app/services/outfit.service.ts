import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../models/Image';
import { Tag } from 'src/app/models/Tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OutfitService {
  constructor(private http: HttpClient) {}

  public uploadOutfit(name:string): Observable<Image> {
    console.log("inside uploadOutfit");
  
    const formData = new FormData();
    formData.append('name',name);  //must be of type 'name'
  
    return this.http.post<Image>('http://coms-309-ks-7.misc.iastate.edu:8080/api/Outfit/create', formData);
  }

  viewAllUsersOutfits() {
    console.log("inside view all users outfits function");
    let outfits: Image[] = [];
    return this.http.get<Image[]>('http://coms-309-ks-7.misc.iastate.edu:8080/api/Outfit/viewByUser')
    .pipe(map(res => {
      res.forEach(obj => {
        let image = new Image();
        image.name = obj.name;
        image.tags = obj.tags;
        image.image = obj.image;
        console.log(image);
        outfits.push(image);
      });
      return outfits;
    }));
  }
}





