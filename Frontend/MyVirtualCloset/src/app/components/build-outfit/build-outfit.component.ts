import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-build-outfit',
  templateUrl: './build-outfit.component.html',
  styleUrls: ['./build-outfit.component.css']
})
export class BuildOutfitComponent implements OnInit {

  //TODO modalService????
  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  public close() {
    this.modalService.destroy();
  }
 

}
