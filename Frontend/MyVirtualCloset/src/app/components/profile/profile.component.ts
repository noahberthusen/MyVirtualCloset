import { Component, OnInit } from '@angular/core';
import { Outfit } from 'src/app/models/Outfit';
import { OutfitService } from 'src/app/services/outfit.service';
import { ClothingItem } from 'src/app/models/ClothingItem';
import { ClothingItemService } from 'src/app/services/clothing-item.service';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  outfits: Outfit[][] = [];
  cards: any[] = [];
  // totalOutfits: Number = 0;
  constructor(
    private outfitService: OutfitService,
    private clothingItemService: ClothingItemService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.outfitService.viewAllUsersOutfits()
    .subscribe((res: any[][]) => {
      // console.log(res.length);
      res.forEach((outfitArr: Outfit[]) => {
        console.log(outfitArr)
        this.buildCard(outfitArr);
        this.outfits.push(outfitArr);
      });
    });
  }

  buildCard(outfit: Outfit[]) {
    let base;
    let tasks = [];
    outfit.forEach((item: Outfit) => {
      if (item.itemID != 'Base') {
        tasks.push(this.clothingItemService.searchClothingItemId(item.itemID));
      } else {
        base = item;
      }
    })
    forkJoin(tasks)
    .subscribe((res: ClothingItem[]) => {
      let tagArr;
      let myTop;
      let myBottom;
      let myMisc;

      res.forEach((item: ClothingItem) => {
        tagArr = item.tags.split(";");
        if (tagArr.indexOf("top") != -1) {
          myTop = item.image;
        } else if (tagArr.indexOf("bottom") != -1) {
          myBottom = item.image;
        } else if (tagArr.indexOf("misc") != -1) {
          myMisc = item.image;
        }
      })

      this.cards.push({
        title: base.name,
        description: base.description,
        top: myTop,
        bottom: myBottom,
        misc: myMisc
      })
    })
  }

  currentUser() {
    return this.authService.currentUserValue;
  }
}