import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import { ModalService } from 'src/app/services/modal.service';
import { SendNotificationComponent } from './components/send-notification/send-notification.component';

//for websocket
// import { SignalRService } from 'src/app/services/signal-r.service';
// import { ToastrService } from 'ngx-toastr';


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
              // private signalR: SignalRService,
              // private toastr: ToastrService  
    ) { }

    ngOnInit(){
      // for websockets
      // this.signalR.startConnection();
    }
  
    //for websocket
    // sendMessage(){
    //   this.signalR.sendNotification("hello", "6b90b519-fd2e-4a85-9ef9-123f63feaf89"); 
    // }

  currentUser() {
    return this.authService.currentUserValue;
  }

  openSendNotificationModal(){
    let inputs = {
      isMobile: false
    }
    this.modalService.init(SendNotificationComponent, inputs, {});
  }

  signOut() {
    this.authService.logout();
  }
}
