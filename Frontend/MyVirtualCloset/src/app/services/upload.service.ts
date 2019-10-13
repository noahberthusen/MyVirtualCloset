import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../models/Image';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) {}

  public uploadImage(image: File): Observable<Image> {
    console.log("inside uploadImage");
    const formData = new FormData();
    console.log(image);
    formData.append('image', image);
    // formData.append('tags',"blue");
    // formData.append('name',"shirt");
    return this.http.post<Image>('https://localhost:44383/api/ClothingItem/add', formData);
  }
}