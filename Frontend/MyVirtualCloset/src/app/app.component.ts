import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { UploadComponent } from 'src/app/components/upload/upload.component';
import { ModalService } from 'src/app/services/modal.service';


//for websocket
import { SignalRService } from 'src/app/services/signal-r.service';
import { ToastrService } from 'ngx-toastr';


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

  constructor(private authService: AuthService,
              private modalService: ModalService ,  
              //for websockets
              private signalR: SignalRService,
              // private toastr: ToastrService  
    ) { }

    ngOnInit(){
      // for websockets
      //this.signalR.startConnection();
    }
  
    //for websocket
    // sendMessage(){
    //   this.signalR.sendNotification("hello", "6b90b519-fd2e-4a85-9ef9-123f63feaf89"); 
    // }

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
