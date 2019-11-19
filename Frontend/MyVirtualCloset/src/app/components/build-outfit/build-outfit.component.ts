import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'
import { ClothingItemService } from 'src/app/services/clothing-item.service';
import { OutfitService } from 'src/app/services/outfit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { ConfirmOutfitComponent } from 'src/app/components/confirm-outfit/confirm-outfit.component';
import { OutfitDataService } from 'src/app/services/outfit-data.service';
import { ClothingItem } from 'src/app/models/ClothingItem';
import { UploadComponent } from 'src/app/components/upload/upload.component';
import { UploadTopComponent } from '../upload-top/upload-top.component';
import { UploadBottomComponent } from '../upload-bottom/upload-bottom.component';
import { UploadMiscComponent } from '../upload-misc/upload-misc.component';


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

  faArrowCircleUp = faArrowCircleUp;

  tops: ClothingItem[];
  bottoms: ClothingItem[];
  misc: ClothingItem[];
  outfitName: string;
  outfitItems: ClothingItem[];

  userInput: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder, 
    private clothingItemService: ClothingItemService,
    private modalService: ModalService,
    private outfitDataService: OutfitDataService
  ){}

  ngOnInit() {
    // this.userInput = this.fb.group({
    //   outfitName: ['', Validators.required],
    // });

    this.clothingItemService.searchForClothes("top")
    .subscribe(res => {
      this.tops = res;
    });

    this.clothingItemService.searchForClothes("bottom")
    .subscribe(res1 => {
      this.bottoms = res1;
    });

    this.clothingItemService.searchForClothes("misc")
    .subscribe(res2 => {
      this.misc = res2;
    });

  }

  // get f(){
  //   return this.userInput.controls;
  // }

  save() {
    console.log("inside save of build outfit");
    
    // console.log("outfitname: " +this.f.outfitName.value);
    // this.outfitName = this.f.outfitName.value;
    
    this.outfitItems = [this.currentTop,this.currentBottom, this.currentMisc]; 
    this.outfitDataService.updateOutfitData(this.outfitItems);


    //open confirm outfit modal
    this.openConfirmOutfitModal();
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

  initAddClothingModal() {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(UploadComponent, inputs, {});
  }

  initAddClothingModalTop() {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(UploadTopComponent, inputs, {});
  }

  initAddClothingModalBottom() {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(UploadBottomComponent, inputs, {});
  }

  initAddClothingModalMisc() {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(UploadMiscComponent, inputs, {});
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
