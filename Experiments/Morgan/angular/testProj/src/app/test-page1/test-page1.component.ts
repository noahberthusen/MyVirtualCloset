import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-page1',
  templateUrl: './test-page1.component.html',
  styleUrls: ['./test-page1.component.css']
})
export class TestPage1Component implements OnInit {

    constructor(private router: Router){}

  ngOnInit() {
  }

  goToPage2(){
    this.router.navigate(["testpage2"]);
  }

}
