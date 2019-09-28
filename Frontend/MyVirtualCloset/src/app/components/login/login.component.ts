import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';    //what is returnUrl?
    console.log(this.returnUrl);    //does this actually print somewhere??
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl])
        },
        error => {
          console.log(error);
        }
      )
  }

  goToSignup() {
    console.log("signup");
    this.router.navigate( ['/signup']);
  }
}
