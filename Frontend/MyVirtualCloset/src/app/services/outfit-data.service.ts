import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Image } from 'src/app/models/Image';

@Injectable({
  providedIn: 'root'
})
export class OutfitDataService {

  private outfitDataSource = new BehaviorSubject<Image[]>(null);
  currentOutfitData = this.outfitDataSource.asObservable();

  constructor() { }

  updateOutfitData(outfitItems: Image[]){
    this.outfitDataSource.next(outfitItems);
  }
}
