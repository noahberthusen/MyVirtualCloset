import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClothingItem } from '../../models/ClothingItem';
import { Tag } from 'src/app/models/Tag';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { OutfitDataService } from 'src/app/services/outfit-data.service';
import { UploadOutfitService } from 'src/app/services/upload-outfit.service';
import { Outfit } from 'src/app/models/Outfit';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-outfit',
  templateUrl: './confirm-outfit.component.html',
  styleUrls: ['./confirm-outfit.component.css']
})
export class ConfirmOutfitComponent implements OnInit {

  //form related
  userInput: FormGroup;
  submitted = false;

  tags: Tag[] = [
    {name: 'stylish'},
  ];

  //chip related
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // itemName: string;

  //saving outfit related
  outfitItems:ClothingItem[];
  outfitName: string;
  outfitId: string;

  constructor(
    private fb: FormBuilder, 
    private modalService: ModalService,
    private outfitDataService: OutfitDataService,
    private uploadOutfitService: UploadOutfitService
  ) { }

  ngOnInit() {
    console.log("inside confirm outfit component");
    this.userInput = this.fb.group({
      // itemName: ['', Validators.required],
      outfitName: ['', Validators.required],

    })
    this.outfitDataService.currentOutfitData.subscribe(outfitItems =>this.outfitItems = outfitItems);
    //doesnt initially have a name till submitted by user in this modal
    this.outfitDataService.currentOutfitName.subscribe(outfitName =>this.outfitName = outfitName);
    console.log("updated outfit");
  }

  //closes modal
  public close() {
    //nothing saved or sent to database
    this.modalService.destroy();
  }

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

  public submitOutfit(){
    console.log("inside submit outfit");

    if(this.userInput.invalid){
      return;
    }

    let outfit = new Outfit();
    //initialize outfit
    outfit.name = this.f.outfitName.value;
    
    //TODO: not working, res and reject never used; create outfit in database and then use outfitId returned in the next function
    // this.createOutfit(outfit).then(res => this.addToOutfit(outfit));
    // this.createOutfit(outfit);

    this.uploadOutfitService.createOutfit(outfit)
    .subscribe(res => {
      outfit = res;
      console.log("outfit created");
    });


    //updates outfit name in outfit data service if needed for future features
    this.outfitDataService.updateName(outfit.name);

  
    //form related
    this.submitted = true;
    if(this.userInput.invalid){
      return;
    }
  }


//   public createOutfit(outfit: Outfit) {
//     // return new Promise((resolve, reject) => {
//       console.log('create outfit by adding name');
//       //TODO: what is the type of the return?
//       //TODO: input as form data
//       this.uploadOutfitService.createOutfit(outfit)
//     //   resolve();
//     // });
// }

//   public addToOutfit(outfit: Outfit) {
//    console.log('add items');
//     //add top to database
//     this.uploadOutfitService.addToOutfit(outfit.id, this.outfitItems[0].id);
//     //add bottom to database
//     this.uploadOutfitService.addToOutfit(outfit.id, this.outfitItems[1].id);
//     //add misc to database
//     this.uploadOutfitService.addToOutfit(outfit.id, this.outfitItems[2].id);
// }
  
}