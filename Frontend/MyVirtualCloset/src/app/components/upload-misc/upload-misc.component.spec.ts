import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMiscComponent } from './upload-misc.component';
import { MaterialModule } from 'src/app/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('UploadMiscComponent', () => {
  let component: UploadMiscComponent;
  let fixture: ComponentFixture<UploadMiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [ UploadMiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('form should be invalid', async(() => {
    component.userInput.controls['itemName'].setValue('');
    expect(component.userInput.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    component.userInput.controls['itemName'].setValue('myItem');
    expect(component.userInput.valid).toBeTruthy();
  }));

});
