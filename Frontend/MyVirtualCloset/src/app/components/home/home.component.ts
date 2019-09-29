import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

//angular material requires installation first: ng add @angular/material
// import {MatButtonModule} from '@angular/material/button'; //angular material feature for using buttons

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  encodedImages: string;
  imageObj;

  constructor( private imagesService: ImagesService) { }

  ngOnInit() {
  }

  displayImages() {
    console.log("in displayImages");
    this.imagesService.displayImages()
      .subscribe(
        data => {
          console.log("in data");
          console.log(data[1].image);
          this.encodedImages = "data:image/jpeg;base64,"+data[1].image;
        },
        error => {
          console.log(error);
        }
      )
  }

}
