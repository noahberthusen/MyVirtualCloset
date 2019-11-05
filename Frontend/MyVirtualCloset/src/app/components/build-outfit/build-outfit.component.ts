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
  currentTop = null;
  currentBottom = null;
  currentMisc = null;
  tops: Image[];
  bottoms: Image[];
  misc: Image[];
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

    
  console.log("inside build outfit component");

    this.clothingItemService.searchForClothes("top")
    .subscribe(res => {
      this.tops = res;
      console.log("top received");
      console.log(this.tops);
      console.log(this.tops[0].tags);
    });

    this.clothingItemService.searchForClothes("bottom")
    .subscribe(res1 => {
      this.bottoms = res1;
      console.log("bottom received");
      console.log(this.bottoms);
      console.log(this.bottoms[0].tags);
    });

    this.clothingItemService.searchForClothes("misc")
    .subscribe(res2 => {
      this.misc = res2;
      console.log("misc received");
      console.log(this.misc);
      console.log(this.misc[0].tags);
    });
  }

  get f(){
    return this.userInput.controls;
  }

  save() {
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

  chooseTops(){
    this.clothingItemService.searchForClothes("top")
    .subscribe(res => {
      this.tops = res;
      console.log("clothing item service used");
      console.log(this.tops);
      console.log(this.tops[0].tags);
    });
    // this.clothing.forEach(image => {
    //   if (image.tags.includes("green")){
    //     this.tops.push(image);
    //   }
    // });
    console.log(this.tops);
    return this.tops;
  }
 
  selectTop(picture) {
    this.currentTop = picture;
  }

  selectBottom(picture) {
    this.currentBottom = picture;
  }

  selectMisc(picture) {
    this.currentMisc = picture;
  }

}
