import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClothingItem } from '../../models/ClothingItem';
import { Tag } from 'src/app/models/Tag';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { OutfitDataService } from 'src/app/services/outfit-data.service';
import { OutfitService } from 'src/app/services/outfit.service';
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
  outfitItems:ClothingItem[];
  outfitName: string;
  outfitId: string;
  outfit: Outfit;
  created: boolean;

  constructor(
    private fb: FormBuilder, 
    private modalService: ModalService,
    private outfitDataService: OutfitDataService,
    private outfitService: OutfitService
  ) { }

  ngOnInit() {
    console.log("inside confirm outfit component");
    this.userInput = this.fb.group({
      outfitName: ['', Validators.required],
      description: ['', Validators.required],
      // private: ['', Validators.required]
    })
    this.outfitDataService.currentOutfitData.subscribe(outfitItems =>this.outfitItems = outfitItems);
    //doesnt initially have a name till submitted by user in this modal
    this.outfitDataService.currentOutfitName.subscribe(outfitName =>this.outfitName = outfitName);
    console.log("updated outfit");
    this.created=false;
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

  public submitDetails(){
    console.log("inside submit name");

    if(this.userInput.invalid){
      console.log("invalid input");
      return;
    }

    this.outfit = new Outfit();
    //initialize outfit
    this.outfit.name = this.f.outfitName.value;
    this.outfit.description = this.f.description.value;

    //put tag items of array into a single string
    this.strTags="";
    this.strTags= this.strTags+this.tags[0].name;
    var i;
    for(i =1; i<this.tags.length;i++){
      this.strTags= this.strTags+";"+this.tags[i].name;
    }
    this.outfit.tags=this.strTags;

    //TODO for demo 5: this.outfit.private = this.f.private.value;

    this.createOutfit(this.outfit);

    //used to determine whether confirm items button should appear
    this.created=true;

    //form related
    this.submitted = true;
    if(this.userInput.invalid){
      return;
    }
  }

  public submitItems(){
    console.log("inside submit items");
    let outfit = new Outfit();
    outfit = this.outfitService.getOutfit();

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

    //form related
    this.submitted = true;
    if(this.userInput.invalid){
      return;
    }
  }


  public createOutfit(outfit: Outfit) {
    return new Promise(resolve => {
      this.outfitService.createOutfit(outfit)
      .subscribe(res => {
        console.log("outfit created");
      });
      resolve();
    });
  }
  
}



