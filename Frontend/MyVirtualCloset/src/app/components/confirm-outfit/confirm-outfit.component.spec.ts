import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmOutfitComponent } from './confirm-outfit.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ConfirmOutfitComponent', () => {
  let component: ConfirmOutfitComponent;
  let fixture: ComponentFixture<ConfirmOutfitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
            ReactiveFormsModule,
            RouterTestingModule,
            MaterialModule,
            BrowserAnimationsModule
        ],
      declarations: [ ConfirmOutfitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOutfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('form should be invalid', async(() => {
    component.userInput.controls['outfitName'].setValue('');
    component.userInput.controls['description'].setValue('');
    expect(component.userInput.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    component.userInput.controls['outfitName'].setValue('myOutfit');
    component.userInput.controls['description'].setValue('Some description');
    expect(component.userInput.valid).toBeTruthy();
  }));




});
