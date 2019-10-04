import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private signupService: SignupService
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role:['', Validators.required]    //this should not be a self defined field, but is required to get a token and login the way the system is currently set up
    })
  }

  get f(){
    return this.signupForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    if(this.signupForm.invalid){
      return;
    }
    let user = new User()
    user.firstName = this.f.firstName.value;
    user.lastName = this.f.lastName.value;
    user.username = this.f.username.value;
    user.email = this.f.email.value;
    user.password = this.f.password.value;
    user.role = this.f.role.value;

    this.signupService.signup(user)
    .subscribe(
      data => {
        this.router.navigate(['/login']);        
      },
      error => {
        console.log(error);
      }
    )
  }

}
