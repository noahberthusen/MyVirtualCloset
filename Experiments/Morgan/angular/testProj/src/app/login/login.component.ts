import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  username: String; 
  password: String; 

  tryLogin() : void {
    if(this.username == 'admin' && this.password == 'admin'){
     this.router.navigate(["testpage2"]);
    }else {
      alert("Invalid credentials");
    }
  }
  // signUp(): void{
  //   this.router.navigate(["signup"]); 
  // }
}