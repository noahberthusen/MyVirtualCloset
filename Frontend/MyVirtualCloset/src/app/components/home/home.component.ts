import { Component, OnInit } from '@angular/core';\
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
  decoder: TextDecoder;
  //btoa((data.image).toString)

  constructor( private imagesService: ImagesService) { }

  ngOnInit() {
  }

  renderImages() {
    var
  }

  displayImages() {
    this.imagesService.displayImages()
      .subscribe(
        data => {
          this.encodedImages = btoa(this.decoder.decode(data.image));
        },
        error => {
          console.log(error);
        }
      )
  }

}
