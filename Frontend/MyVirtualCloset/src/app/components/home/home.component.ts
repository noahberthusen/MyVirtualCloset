import { Component, OnInit } from '@angular/core';

//angular material requires installation first: ng add @angular/material
// import {MatButtonModule} from '@angular/material/button'; //angular material feature for using buttons

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
