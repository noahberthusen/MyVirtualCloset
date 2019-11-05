import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


//for websocket
import { SignalRService } from 'src/app/services/signal-r.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    //for websockets
    private signalR: SignalRService,
    private toastr: ToastrService 
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      message: ['', Validators.required],
      })

      //websockets
      this.signalR.startConnection();

  }

  
  get f(){
    return this.signupForm.controls;
  }

 sendMessage(){
   
   this.submitted = true;

   if(this.signupForm.invalid){
     return;
   }
  
   //TODO: add logic that convets username to id
   // "6b90b519-fd2e-4a85-9ef9-123f63feaf89"
  //websockets
  this.signalR.sendNotification(this.f.message.value, this.f.username.value); 


 }

  public close() {
    this.modalService.destroy();
  }

}
