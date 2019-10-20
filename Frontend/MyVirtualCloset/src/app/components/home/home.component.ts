import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { ModalService } from 'src/app/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  encodedImages: string;
  imageObj;

  constructor( private imagesService: ImagesService, private modalService: ModalService, private router: Router,) { }

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


  navigateToBuildOutfit(){
    this.router.navigate( ['/buildoutfit']);
  }


}
