import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ClothingItemService } from 'src/app/services/clothing-item.service';
import { OutfitService } from 'src/app/services/outfit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { ImagesService } from 'src/app/services/images.service';
import { ConfirmOutfitComponent } from 'src/app/components/confirm-outfit/confirm-outfit.component';
import { OutfitDataService } from 'src/app/services/outfit-data.service';
import { ClothingItem } from 'src/app/models/ClothingItem';


@Component({
  selector: 'app-build-outfit',
  templateUrl: './build-outfit.component.html',
  styleUrls: ['./build-outfit.component.css']
})
export class BuildOutfitComponent implements OnInit {
  faCheck = faCheck;
  faTimes = faTimes;
  clothing: ClothingItem[];
  currentTop = null;
  currentBottom = null;
  currentMisc = null;
  tops: ClothingItem[];
  outfitName: string;
  outfitItems: ClothingItem[];

  userInput: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder, 
    private imagesService: ImagesService, 
    private clothingItemService: ClothingItemService,
    private outfitService: OutfitService, 
    private modalService: ModalService,
    private outfitDataService: OutfitDataService
  ){}

  ngOnInit() {
    this.userInput = this.fb.group({
      outfitName: ['', Validators.required],
    });

    
    console.log("inside build outfit component");

    this.clothingItemService.viewAllUsersClothes()
    .subscribe(res => {
      this.clothing = res;
    });
  }

  get f(){
    return this.userInput.controls;
  }

  save() {
    //TODO: confirm this work
    this.outfitItems = [this.getTop(),this.getBottom(), this.getMisc()]; 
    this.outfitDataService.updateOutfitData(this.outfitName, this.outfitItems);
    
    //open confirm outfit modal
    this.openConfirmOutfitModal();

    // this.submitted = true;
    // if(this.userInput.invalid){
    //   return;
    // }
    // this.outfitName = this.f.outfitName.value;

    // this.outfitService.uploadOutfit(this.outfitName).subscribe(
    //   (res) => {
      
    //   },
    //   (err) => {
      
    //   })
  }

  openConfirmOutfitModal(){
    console.log("inside open confirm outfit modal");
    let inputs = {
      isMobile: false
    }
    this.modalService.init(ConfirmOutfitComponent, inputs, {});
  }

  discard() {
    this.currentBottom = null;
    this.currentMisc = null;
    this.currentTop = null;
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
