import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'


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

  constructor(private authService: AuthService) { }

  currentUser() {
    return this.authService.currentUserValue;
  }

  signOut() {
    this.authService.logout();
  }
}
