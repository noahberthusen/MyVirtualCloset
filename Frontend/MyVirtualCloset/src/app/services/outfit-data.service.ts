import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ClothingItem } from '../models/ClothingItem';

//used for getting image data from build outfit component to confirm outfit component


@Injectable({
  providedIn: 'root'
})
export class OutfitDataService {

  private outfitDataSource = new BehaviorSubject<ClothingItem[]>(null);
  currentOutfitData = this.outfitDataSource.asObservable();

  private outfitNameSource = new BehaviorSubject<string>(null);
  currentOutfitName = this.outfitNameSource.asObservable();

  constructor() { }

  updateOutfitData(outfitName: string, outfitItems: ClothingItem[]){
    console.log("inside update outfit of outfit data service");

    this.outfitNameSource.next(outfitName);
    this.outfitDataSource.next(outfitItems);
  }

  public get currentItemsValue(): ClothingItem[] {
    return this.outfitDataSource.value;
  }

  public get currentNameValue(): String {
    return this.outfitNameSource.value;
  }
}
