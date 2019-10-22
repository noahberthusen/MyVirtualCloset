import { Component, OnInit } from '@angular/core';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ClothingItemService } from 'src/app/services/clothing-item.service';
import { Image } from '../../models/Image';

@Component({
  selector: 'app-build-outfit',
  templateUrl: './build-outfit.component.html',
  styleUrls: ['./build-outfit.component.css']
})
export class BuildOutfitComponent implements OnInit {
  faCheck = faCheck;
  faTimes = faTimes;
  clothing: Image[];
  currentTop = null;
  currentBottom = null;
  currentMisc = null;
  tops: Image[];

  constructor(private clothingItemService: ClothingItemService) { }

  ngOnInit() {
    this.clothingItemService.viewAllUsersClothes()
    .subscribe(res => {
      this.clothing = res;
      console.log(this.clothing);
      console.log(this.clothing[0].tags);
    })
  }

  save() {
    
  }

  discard() {

  }

  chooseTops(){
    this.clothing.forEach(image => {
      if (image.tags.includes("green")){
        this.tops.push(image);
      }
    });
    console.log(this.tops);
    return this.tops;
  }
 
  selectTop(picture) {
    this.currentTop = picture;
  }

  getTop(){
    if (this.currentTop != null){
      return this.currentTop.image;
    }
  }

  selectBottom(picture) {
    this.currentBottom = picture;
  }

  getBottom(){
    if (this.currentBottom != null){
      return this.currentBottom.image;
    }
  }

  selectMisc(picture) {
    this.currentMisc = picture;
  }

  getMisc(){
    if (this.currentMisc != null){
      return this.currentMisc.image;
    }
  }
}
