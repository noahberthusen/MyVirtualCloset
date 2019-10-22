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

  constructor(private clothingItemService: ClothingItemService) { }

  ngOnInit() {
    this.clothingItemService.viewAllUsersClothes()
    .subscribe(res => {
      this.clothing = res;
      console.log(this.clothing);
    })
  }

  save() {

  }

  discard() {

  }
 
  selectItem() {
    console.log("hey you clicked the picture");
  }

}
