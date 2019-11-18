import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ClothingItem } from '../models/ClothingItem';

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
