import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { ModalService } from 'src/app/services/modal.service';
import { BuildOutfitComponent } from 'src/app/components/build-outfit/build-outfit.component';
import { Router } from '@angular/router';


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

  initBuildOutfitModal() {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(BuildOutfitComponent, inputs, {});
  }

  navigateToBuildOutfit(){
    this.router.navigate( ['/buildoutfit']);
  }


}
