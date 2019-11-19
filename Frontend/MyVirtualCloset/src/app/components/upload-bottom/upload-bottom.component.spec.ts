import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBottomComponent } from './upload-bottom.component';
import { MaterialModule } from 'src/app/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('UploadBottomComponent', () => {
  let component: UploadBottomComponent;
  let fixture: ComponentFixture<UploadBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [ UploadBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBottomComponent);
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
    component.userInput.controls['itemName'].setValue('blueShirt');
    expect(component.userInput.valid).toBeTruthy();
  }));


});
