import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClothingItem } from '../../models/ClothingItem';
import { Tag } from 'src/app/models/Tag';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { OutfitDataService } from 'src/app/services/outfit-data.service';
import { UploadOutfitService } from 'src/app/services/upload-outfit.service';
import { Outfit } from 'src/app/models/Outfit';


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
  itemName: string;

  //saving outfit related
  outfitItems:ClothingItem[];
  outfitName: string;
  outfit: Outfit;
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
      itemName: ['', Validators.required],
    })
    this.outfitDataService.currentOutfitData.subscribe(outfitItems =>this.outfitItems = outfitItems);
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

    //initialize outfit
    this.outfit.name= this.outfitName;
    //create outfit in database
    // this.outfitId = 
    this.uploadOutfitService.createOutfit(this.outfit);

    //add top to database
    this.uploadOutfitService.addToOutfit(this.outfitId, this.outfitItems[0].id);
    //add bottom to database
    this.uploadOutfitService.addToOutfit(this.outfitId, this.outfitItems[1].id);
    //add misc to database
    this.uploadOutfitService.addToOutfit(this.outfitId, this.outfitItems[2].id);


    //form related
    this.submitted = true;
    if(this.userInput.invalid){
      return;
    }
  }


 

}