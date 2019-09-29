import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Image } from '../models/Image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private currentImageSubject: BehaviorSubject<Image>;
  public currentImage: Observable<Image>;

  constructor(private http: HttpClient) {
    this.currentImageSubject = new BehaviorSubject<Image>(JSON.parse(localStorage.getItem('currentImage')));
    this.currentImage = this.currentImageSubject.asObservable();
  }

  public get currentImageValue(): Image {
    return this.currentImageSubject.value;
  }

  displayImages() {
    console.log("inside clothing service");
    return this.http.get<Image>('https://localhost:44383/api/ClothingItem/viewAllUserClothes')
      .pipe(map(images => {
        console.log("inside http get request");
        console.log(images);  
        return images;
      }));
  }
}
