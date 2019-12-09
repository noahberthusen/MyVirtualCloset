import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { Outfit } from 'src/app/models/Outfit';
import { forkJoin } from 'rxjs';
import { ClothingItem } from 'src/app/models/ClothingItem';
import { User } from 'src/app/models/User';
import { AuthService } from '../../services/auth.service';
import { FeedService } from '../../services/feed.service';
import { ClothingItemService } from '../../services/clothing-item.service';
import { SignalRService } from 'src/app/services/signal-r.service';

//angular material requires installation first: ng add @angular/material
// import {MatButtonModule} from '@angular/material/button'; //angular material feature for using buttons

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  encodedImages: string;
  cards: any[] = [];
  myUser: User = null;
  outfits: Outfit[][] = [];
  myCompanions: Map<string, string> = new Map<string, string>();

  constructor(
    private modalService: ModalService, 
    private authService: AuthService,
    private feedService: FeedService,
    private clothingItemService: ClothingItemService,
    private router: Router,
    private signalRService: SignalRService) { }

  ngOnInit() {
    this.myUser = this.authService.currentUserValue;

    this.feedService.viewAllFeedOutfits()
    .subscribe((res: any[][]) => {
      res.forEach((outfitArr: Outfit[]) => {
        this.buildCard(outfitArr);
        this.outfits.push(outfitArr);
      });
    });
  }

  buildCard(outfit: Outfit[]) {
    let base: Outfit;
    let tasks = [];
    outfit.forEach((item: Outfit) => {
      if (item.itemID != 'Base') {
        tasks.push(this.clothingItemService.searchClothingItemId(item.itemID));
      } else {
        base = item;
      }
    })
    this.feedService.getUsersUsername(base.user)
    .subscribe((myRes) => { 
      this.myCompanions.set(myRes.id, myRes.username);
    })

    forkJoin(tasks)
    .subscribe((res) => {
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
        user: this.myCompanions.get(base.user), 
        userId: base.user,
        title: base.name,
        description: base.description,
        top: myTop,
        bottom: myBottom,
        misc: myMisc
      })
    })
  }

  sendLike(card) {
    this.signalRService.sendNotification(this.myUser.username + " liked your outfit!", card.userId);
  }

}
