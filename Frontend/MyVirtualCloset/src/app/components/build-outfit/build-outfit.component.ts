import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'
import { ClothingItemService } from 'src/app/services/clothing-item.service';
import { OutfitService } from 'src/app/services/outfit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { ClothingItem } from 'src/app/models/ClothingItem';
import { UploadComponent } from 'src/app/components/upload/upload.component';
import { ArticleTypeService } from 'src/app/services/article-type.service';

//confirm outfit related
import { Outfit } from 'src/app/models/Outfit';
import { Tag } from 'src/app/models/Tag';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Observable } from 'rxjs';


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

  //for combining upload components
  top = "top";
  bottom = "bottom";
  miscellaneous = "misc";

  faArrowCircleUp = faArrowCircleUp;

  tops: ClothingItem[];
  bottoms: ClothingItem[];
  misc: ClothingItem[];
  outfitName: string;
  outfitItems: ClothingItem[];

  userInput: FormGroup;
  submitted = false;



  //confirm outfit related

  //form related
  userInputConfirmOutfit: FormGroup;
  submittedConfirmOutfit = false;

  tags: Tag[] = [
    // {name: 'stylish'},
  ];

  //chip related
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  strTags: string;

  //saving outfit related
  outfitItemsConfirmOutfit:ClothingItem[];
  outfitNameConfirmOutfit: string;
  outfitId: string;
  outfit: Outfit;
  created: boolean;

  constructor(
    private fb: FormBuilder, 
    private clothingItemService: ClothingItemService,
    private modalService: ModalService,
    private articleTypeService: ArticleTypeService,
    //confirm outfit related
    private fbConfirmOutfit: FormBuilder, 
    private outfitService: OutfitService
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

    // outfit details related
    console.log("inside confirm outfit component");
    this.userInput = this.fbConfirmOutfit.group({
      outfitName: ['', Validators.required],
      description: ['', Validators.required],
      // private: ['', Validators.required]
    })
    console.log("updated outfit");
    this.created=false;

  }

  // get f(){
  //   return this.userInput.controls;
  // }

  save() {

    this.submitDetails(()=> 
      this.createOutfit(()=> 
        this.submitItems(()=> 
          this.discard()
        )
      )
    );
  
  }

  discard() {
    console.log("inside discard");
    this.currentBottom = null;
    this.currentMisc = null;
    this.currentTop = null;

    //outfit details
    //name and description
    this.userInput.reset();
    //tags
    const length = this.tags.length;
    var index;
    for (index = length; index>=0; index--) {
      this.tags.splice(index, 1);
    }
  }

  initAddClothingModalTop() {
    this.articleTypeService.updateArticleType("top");
    console.log("updated article type to top");
    let inputs = {
      isMobile: false
    }
    this.modalService.init(UploadComponent, inputs, {});
  }
  initAddClothingModalBottom() {
    this.articleTypeService.updateArticleType("bottom");
    console.log("updated article type");
    let inputs = {
      isMobile: false
    }
    this.modalService.init(UploadComponent, inputs, {});
  }
  initAddClothingModalMisc() {
    this.articleTypeService.updateArticleType("misc");
    let inputs = {
      isMobile: false
    }
    this.modalService.init(UploadComponent, inputs, {});
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


  //confirm outfit related

  removeTag(tags: Tag): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  //chip related code
   add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tags
    if ((value || '').trim()) {
        this.tags.push({name: value.trim()
      });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

    get f(){
    return this.userInput.controls;
  }

  public submitDetails(callBackFunction){
    setTimeout(() => {
      console.log("inside submit name");
      if(this.userInput.invalid){
      console.log("invalid input");
      return;
      }

      this.outfit = new Outfit();
      //initialize outfit
      this.outfit.name = this.f.outfitName.value;
      this.outfit.description = this.f.description.value;
      this.outfitItems = [this.currentTop,this.currentBottom, this.currentMisc]; 

      //put tag items of array into a single string
      this.strTags="";
      this.strTags= this.strTags+this.tags[0].name;
      var i;
      for(i =1; i<this.tags.length;i++){
        this.strTags= this.strTags+";"+this.tags[i].name;
      }
      this.outfit.tags=this.strTags;

      //TODO for demo 5: this.outfit.private = this.f.private.value;
        callBackFunction();
    }, 1000);

  }

  public createOutfit(callBackFunction){
    setTimeout(() => {
      console.log("inside create outfit");
    
      return new Promise(resolve => {
        this.outfitService.createOutfit(this.outfit)
        .subscribe(res => {
          console.log("outfit created");
          callBackFunction();
        });
        resolve();
      });
    }, 1000);       

  }

  public submitItems(callBackFunction){
    setTimeout(() => {
      console.log("inside submit items");
      let outfit = new Outfit();
      outfit = this.outfitService.getOutfit();
      console.log(outfit.id);

      this.outfitService.addToOutfit(outfit.id, this.outfitItems[0].id)
      .subscribe(res => {
        console.log("top added to outfit");
      });

      this.outfitService.addToOutfit(outfit.id, this.outfitItems[1].id)
      .subscribe(res => {
        console.log("bottom added to outfit");
      });

      this.outfitService.addToOutfit(outfit.id, this.outfitItems[2].id)
      .subscribe(res => {
        console.log("misc added to outfit");
      });

      callBackFunction();
    }, 1000);    
  }

 }
