import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-build-outfit',
  templateUrl: './build-outfit.component.html',
  styleUrls: ['./build-outfit.component.css']
})
export class BuildOutfitComponent implements OnInit {

  constructor(private modalService: ModalService, private router: Router) { }

  ngOnInit() {
  }

  //used if modal
  // public close() {
  //   this.modalService.destroy();
  // }
 
  openAddClothingModal(){
    
  }

}
