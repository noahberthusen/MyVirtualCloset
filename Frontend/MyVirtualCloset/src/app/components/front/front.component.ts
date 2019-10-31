import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {
  returnUrl: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private signalRService: SignalRService) { }

  ngOnInit() {
  }

  goToLogin() {
    console.log("login");
    this.router.navigate( ['/login']);
  }

  test() {
    this.signalRService.sendNotification("noah", "hello!");
  }
}
