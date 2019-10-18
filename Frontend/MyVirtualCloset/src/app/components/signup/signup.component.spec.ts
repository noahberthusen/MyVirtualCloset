import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot() 
      ],
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('form should be invalid', async(() => {
    component.signupForm.controls['firstName'].setValue('');
    component.signupForm.controls['lastName'].setValue('');
    component.signupForm.controls['username'].setValue('');
    component.signupForm.controls['email'].setValue('');
    component.signupForm.controls['password'].setValue('');
    component.signupForm.controls['role'].setValue('');
    expect(component.signupForm.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    component.signupForm.controls['firstName'].setValue('S');
    component.signupForm.controls['lastName'].setValue('Mitra');
    component.signupForm.controls['username'].setValue('smitra');
    component.signupForm.controls['email'].setValue('smitra@iastate.edu');
    component.signupForm.controls['password'].setValue('password');
    component.signupForm.controls['role'].setValue('User');
    expect(component.signupForm.valid).toBeTruthy();
  }));
});
