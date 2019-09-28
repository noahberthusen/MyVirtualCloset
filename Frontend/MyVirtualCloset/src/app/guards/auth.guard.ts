import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private authService: AuthService) { }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.authService.currentUserValue;
      if (currentUser){
        return true;
      }
      console.log("inside auth guard");
      //if not a user, return to login page
      this.router.navigate(
        ['/login'], { queryParams: { returnUrl: state.url }}  //not sure how the queryParams works??
      );
      return false;
    }
  
}
