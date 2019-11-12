import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTopComponent } from './upload-top.component';

describe('UploadTopComponent', () => {
  let component: UploadTopComponent;
  let fixture: ComponentFixture<UploadTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
