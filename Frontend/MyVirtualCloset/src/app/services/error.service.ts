import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  parseError(error: HttpErrorResponse) {
    return error.error.message ? error.error.message : "An unknown error occurred. Please try again later.";
  }
}
