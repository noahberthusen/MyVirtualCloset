import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';

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
    this.signupService.signup(this.f.firstName.value, this.f.lastName.value, this.f.username.value, this.f.password.value, this.f.role.value)
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
