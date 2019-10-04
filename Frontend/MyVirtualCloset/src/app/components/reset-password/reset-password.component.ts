import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  passwordResetForm: FormGroup;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.passwordResetForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatedPass: ['', Validators.required],
      token: ['', Validators.required]
    })

    this.passwordResetForm.patchValue({
      token: this.route.snapshot.queryParams['id']
    })
  }

  get f() {
    return this.passwordResetForm.controls;
  }

  onSubmit() {
    if (this.passwordResetForm.invalid) {
      console.log('form is invalid');
      return;
    }
    
    let user = new User();
    user.username = this.f.username.value;
    user.password = this.f.password.value;
    user.id = this.f.token.value;

    this.authService.changePassword(user)
    .subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
