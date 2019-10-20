import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';    //what is returnUrl?
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    let user = new User();
    user.username = this.f.username.value;
    user.password = this.f.password.value;
    
    this.authService.login(user)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl])
        },
        error => {
          console.log(error);
          this.errorService.parseError(error);
          this.toastr.error(this.errorService.parseError(error));
        }
      )
  }

  goToSignup() {
    this.router.navigate( ['/signup']);
  }

  forgotPassword() {
    let user = new User();
    user.username = this.f.username.value;

    if (user.username == null) 
      return;
    // make sure they know they need to put username in

    this.authService.forgotPassword(user)
    .subscribe(
      data => {
        console.log(data);
        // want to switch to toasts
      },
      error => {
        console.log(error);
      }
    );
  }
}
