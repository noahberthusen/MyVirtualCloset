import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {
  returnUrl: string;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  goToLogin() {
    console.log("login");
    this.router.navigate( ['/login']);
  }
}
