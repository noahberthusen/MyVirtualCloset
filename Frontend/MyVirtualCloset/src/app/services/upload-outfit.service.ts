import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Outfit } from 'src/app/models/Outfit';
// import { ClothingItem } from '../models/ClothingItem';

@Injectable({
  providedIn: 'root'
})
export class UploadOutfitService {


  // private currentImagesSubject: BehaviorSubject<ClothingItem[]>;
  // public currentImages: Observable<ClothingItem[]>;
  private tempArr: string[];
  
  constructor(
      private http: HttpClient,
      // private router: Router
  ) 
  {
    console.log("inside constructor of upload outfit service");
    // this.currentImagesSubject = new BehaviorSubject<ClothingItem[]>(JSON.parse(localStorage.getItem('currentImages')));
    // this.currentImages = this.currentImagesSubject.asObservable();
  }
  
  createOutfit(outfit: Outfit) {
    console.log("inside create outfit");
    return this.http.post<Outfit>('http://localhost:44383/api/Outfit/create', outfit);
  }

  //TODO: not sure if input param to post needs to be an array
  addToOutfit(outfitId: string, itemId: string){
    console.log("inside add to outfit");
    this.tempArr = [outfitId, itemId]
    return this.http.post<Outfit>('http://localhost:44383/api/Outfit/addTo', this.tempArr);
  }
}

