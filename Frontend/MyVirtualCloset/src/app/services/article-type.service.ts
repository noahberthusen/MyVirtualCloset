import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

//used for getting article type data from build outfit component to upload component


@Injectable({
  providedIn: 'root'
})
export class ArticleTypeService {

  private articleTypeSource = new BehaviorSubject<string>(null);
  currentArticleType = this.articleTypeSource.asObservable();

  constructor() { }

  updateArticleType(articleType: string){
    console.log("inside update article type service: " + articleType);
    this.articleTypeSource.next(articleType);
  }

  // public get getCurrentArticle(): String {
  //   console.log("inside get current article method");
  //   return this.articleTypeSource.value;
  // }


}
