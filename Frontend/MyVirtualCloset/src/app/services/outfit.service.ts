import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../models/Image';
import { Tag } from 'src/app/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class OutfitService {
  constructor(private http: HttpClient) {}

  public uploadOutfit(name:string): Observable<Image> {
    console.log("inside uploadOutfit");
  
    const formData = new FormData();
    formData.append('name',name);  //must be of type 'name'
  
    return this.http.post<Image>('https://localhost:44383/api/Outfit/create', formData);
  }
}





