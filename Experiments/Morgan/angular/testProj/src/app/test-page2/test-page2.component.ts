import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-page2',
  templateUrl: './test-page2.component.html',
  styleUrls: ['./test-page2.component.css']
})
export class TestPage2Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
