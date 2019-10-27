import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { UploadComponent } from 'src/app/components/upload/upload.component';
import { ModalService } from 'src/app/services/modal.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyVirtualCloset';
  faSignIn = faSignInAlt;
  faSignOut = faSignOutAlt;
  faPlusCircle = faPlusCircle;

  constructor(private authService: AuthService, private modalService: ModalService) { }

  currentUser() {
    return this.authService.currentUserValue;
  }

  //the following code is used if this is a modal
  initAddClothingModal() {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(UploadComponent, inputs, {});
  }

  public closeModal(){

  }

  signOut() {
    this.authService.logout();
  }
}
