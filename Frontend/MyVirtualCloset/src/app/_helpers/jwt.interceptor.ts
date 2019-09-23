// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable } from 'rxjs';

// import { AuthenticationService } from '@src/app/_services/authentication.service';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//     constructor(private authenticationService: AuthenticationService) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         // add auth header with jwt if user is logged in and request is to api url
//         const currentUser = this.authenticationService.currentUserValue;
//         const isLoggedIn = currentUser && currentUser.token;
//         const isApiUrl = request.url.startsWith(`http://localhost:44383/users/authenticate`); //config.apiUrl  
//         if (isLoggedIn && isApiUrl) {
//             request = request.clone({
//                 setHeaders: {
//                     Authorization: `Bearer ${currentUser.token}`
//                 }
//             });
//         }

//         return next.handle(request);
//     }
// }