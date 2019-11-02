import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//for websocket
// import { SignalRService } from 'src/app/services/signal-r.service';
// import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {
  returnUrl: string;

  constructor(private router: Router,
              //for websockets
              // private signalR: SignalRService,
              // private toastr: ToastrService          
  ) { }

  ngOnInit() {
    //for websockets
    // this.signalR.startConnection();
  }

  //for websocket
  sendMessage(){
    // this.signalR.sendNotification("hello", "6b90b519-fd2e-4a85-9ef9-123f63feaf89"); 
  }

  goToLogin() {
    console.log("login");
    this.router.navigate( ['/login']);
  }
}
