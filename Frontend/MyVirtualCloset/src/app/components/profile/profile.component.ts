import { Component, OnInit } from '@angular/core';
import { Outfit } from 'src/app/models/Outfit';
import { OutfitService } from 'src/app/services/outfit.service';
import { ClothingItem } from 'src/app/models/ClothingItem';
import { ClothingItemService } from 'src/app/services/clothing-item.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  outfits: Outfit[][] = [];
  cards: any[] = [];
  constructor(
    private outfitService: OutfitService,
    private clothingItemService: ClothingItemService
  ) { }

  ngOnInit() {
    this.outfitService.viewAllUsersOutfits()
    .subscribe((res: any[][]) => {
      res.forEach((outfitArr: Outfit[]) => {
        this.buildCard(outfitArr);
        this.outfits.push(outfitArr);
      });
    });
  }

  buildCard(outfit: Outfit[]) {
    let tasks = [];
    outfit.forEach((item: Outfit) => {
      if (item.itemID != 'Base') {
        tasks.push(this.clothingItemService.searchClothingItemId(item.itemID));
      }
    })
    forkJoin(tasks)
    .subscribe(res => {
      // build card here using res and outfit
      console.log(res);
    })
  }

  // foo() {
  //   this.outfits.forEach((outfit) => {
  //     this.cards.push({
  //       title: outfit.name,
  //       description: outfit.description,
  //       // buttontext: 'b',
  //       img: 'm',
  //       top:{
          
  //       }
  //     })
  //   });
  // }
  // cards = [
  //   {
  //     title: this.outfits[this.i].name,
  //     description: this.outfits[this.i].description,
  //     buttonText: 'Button',
  //     img: "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"
  //   },
  //   {
  //     title: 'Card Title 2',
  //     description: 'Some quick example text to build on the card title and make up the bulk of the card content',
  //     buttonText: 'Button',
  //     // img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
  //   },
  //   {
  //     title: 'Card Title 3',
  //     description: 'Some quick example text to build on the card title and make up the bulk of the card content',
  //     buttonText: 'Button',
  //     // img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
  //   },
  //   {
  //     title: 'Card Title 4',
  //     description: 'Some quick example text to build on the card title and make up the bulk of the card content',
  //     buttonText: 'Button',
  //     // img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
  //   },
  //   {
  //     title: 'Card Title 5',
  //     description: 'Some quick example text to build on the card title and make up the bulk of the card content',
  //     buttonText: 'Button',
  //     // img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
  //   }
  // ];
}