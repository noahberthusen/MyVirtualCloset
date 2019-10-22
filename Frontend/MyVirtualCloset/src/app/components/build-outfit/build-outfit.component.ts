import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ClothingItemService } from 'src/app/services/clothing-item.service';
import { Image } from '../../models/Image';
import { OutfitService } from 'src/app/services/outfit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { ImagesService } from 'src/app/services/images.service';

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
  outfitName: string;

  userInput: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder, 
    private imagesService: ImagesService, 
    private clothingItemService: ClothingItemService,
    private outfitService: OutfitService, 
    private modalService: ModalService){}

  ngOnInit() {
    this.userInput = this.fb.group({
      outfitName: ['', Validators.required],
    });
    
    this.clothingItemService.viewAllUsersClothes()
    .subscribe(res => {
      this.clothing = res;
      console.log(this.clothing);
      console.log(this.clothing[0].tags);
    });
  }

  get f(){
    return this.userInput.controls;
  }

  save(name: string) {
    this.submitted = true;
    if(this.userInput.invalid){
      return;
    }
    this.outfitName = this.f.outfitName.value;

    this.outfitService.uploadOutfit(this.outfitName).subscribe(
      (res) => {
      
      },
      (err) => {
      
      })
  }

  discard() {
    this.currentBottom = null;
    this.currentMisc = null;
    this.currentTop = null;
  }

  // chooseTops(){
  //   this.clothing.forEach(image => {
  //     if (image.tags.includes("green")){
  //       this.tops.push(image);
  //     }
  //   });
  //   console.log(this.tops);
  //   return this.tops;
  // }
 
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
