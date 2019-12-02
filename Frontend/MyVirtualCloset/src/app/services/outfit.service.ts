import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Outfit } from 'src/app/models/Outfit';
import { ClothingItem } from '../models/ClothingItem';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class OutfitService {

  outfit: Outfit;
  
  constructor(
      private http: HttpClient,
  ) 
  {
    console.log("inside constructor of upload outfit service");
  }
  
  createOutfit(outfit: Outfit) {
    console.log("inside create outfit");

    return this.http.post<Outfit>('http://coms-309-ks-7.misc.iastate.edu:8080/api/Outfit/create', outfit)
    .pipe(map(res => {
      console.log("posting new outfit with name");
      let outfit = new Outfit();
      outfit.id=res.id;
      outfit.name=res.name;
      outfit.description = res.description;
      outfit.tags = res.tags;
      this.saveOutfit(outfit);
      return outfit;
    }));
  }


  saveOutfit(outfit: Outfit){
    this.outfit = outfit;
  }

  getOutfit(){
    return this.outfit;
  }

  addToOutfit(outfitId: string, itemId: string){
    console.log("inside add to outfit");

    const formData = new FormData();
    formData.append("outfitId", outfitId);
    formData.append("itemId", itemId);


    //TODO: post isnt working
    return this.http.post<Outfit>('http://coms-309-ks-7.misc.iastate.edu:8080/api/Outfit/addTo', formData)
    .pipe(map(res => {
      console.log("adding new item to outfit");
    }));
  }

  public uploadOutfit(name:string): Observable<ClothingItem> {
    console.log("inside uploadOutfit");
  
    const formData = new FormData();
    formData.append('name',name);  //must be of type 'name'
  
    return this.http.post<ClothingItem>('http://coms-309-ks-7.misc.iastate.edu:8080/api/Outfit/create', formData);
  }

  viewAllUsersOutfits() {
    console.log('in view all outfit');
    return this.http.get<any[][]>('http://coms-309-ks-7.misc.iastate.edu:8080/api/Outfit/viewByUser');
  }


}

