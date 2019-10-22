import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { BuildOutfitComponent } from 'src/app/components/build-outfit/build-outfit.component';
import { UploadComponent } from 'src/app/components/upload/upload.component';

//angular material requires installation first: ng add @angular/material
// import {MatButtonModule} from '@angular/material/button'; //angular material feature for using buttons

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  encodedImages: string;
  // imageObj;

  constructor(private modalService: ModalService, private router: Router) { }

  ngOnInit() {
  }

  displayImages() {

  }

  initBuildOutfitModal() {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(BuildOutfitComponent, inputs, {});
  }

  //the following code is used if this is a modal
  initAddClothingModal() {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(UploadComponent, inputs, {});
  }

  //the following code is used if add clothing is a page instead of modal
  // goToUploadComponent(){
  //   this.router.navigate(['/upload']); 
  // }

  


}
