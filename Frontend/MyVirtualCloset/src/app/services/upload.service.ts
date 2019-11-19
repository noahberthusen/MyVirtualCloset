import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/models/Tag';
import { ClothingItem } from 'src/app/models/ClothingItem';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  tags: string;
  constructor(private http: HttpClient) {}

  public uploadImage(image: File, tagsArray: Tag[], name:string): Observable<ClothingItem> {
    console.log("inside uploadImage");

    this.tags="";

    const formData = new FormData();
    formData.append('file', image);   //must be of type 'file' based on backend method
    
    //put tag items of array into a single string
    this.tags= this.tags+tagsArray[0].name;
    var i;
    for(i =1; i<tagsArray.length;i++){
      this.tags= this.tags+";"+tagsArray[i].name;
    }

    formData.append('tags', this.tags);       //must be of type 'tags'
    formData.append('name',name);  //must be of type 'name'

    return this.http.post<ClothingItem>('http://coms-309-ks-7.misc.iastate.edu:8080/api/ClothingItem/add', formData);
  }


}