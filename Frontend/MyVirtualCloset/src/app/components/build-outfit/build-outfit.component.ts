import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-build-outfit',
  templateUrl: './build-outfit.component.html',
  styleUrls: ['./build-outfit.component.css']
})
export class BuildOutfitComponent implements OnInit {
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  public close() {
    this.modalService.destroy();
  }
 

}
