import { Component, OnInit } from '@angular/core';
import { Outfit } from 'src/app/models/Outfit';
import { OutfitService } from 'src/app/services/outfit.service';
import { ClothingItem } from 'src/app/models/ClothingItem';
import { ClothingItemService } from 'src/app/services/clothing-item.service';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CompanionService } from '../../services/companion.service';
import { User } from 'src/app/models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/services/error.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  outfits: Outfit[][] = [];
  cards: any[] = [];
  totalOutfits: Number = 0;
  allCompanions: User[] = [];
  myUser: User = null;
  something: boolean = false;

  userForm: FormGroup;
  submitted = false;

  constructor(
    private outfitService: OutfitService,
    private fb: FormBuilder,
    private clothingItemService: ClothingItemService,
    private authService: AuthService,
    private companionService: CompanionService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.myUser = this.authService.currentUserValue;

    this.outfitService.viewAllUsersOutfits()
    .subscribe((res: any[][]) => {
      res.forEach((outfitArr: Outfit[]) => {
        this.buildCard(outfitArr);
        this.outfits.push(outfitArr);
      });
    });

    this.companionService.getAllCompanions(this.myUser.id)
    .subscribe((res: User[]) => {
      res.forEach((use: User) => {
        this.allCompanions.push(use);
      })
    })

    this.userForm = this.fb.group({
      username: ['', Validators.required]
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

  setNumOutfits() {
    this.totalOutfits = this.cards.length;
    return this.totalOutfits;
  }

  currentUser() {
    return this.myUser;
  }

  getCompanionNum(){
    return this.allCompanions.length;
  }

  itWasClicked(){
    this.something = !this.something;
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    let user = this.f.username.value;

    this.companionService.addCompanion(user)
    .subscribe(
      data => {
        this.toastr.success("Successfully added " + user + " as a companion");
      },
      error => {
        console.log(error);
        this.errorService.parseError(error);
        this.toastr.error(this.errorService.parseError(error));
      }
    )
  }
}