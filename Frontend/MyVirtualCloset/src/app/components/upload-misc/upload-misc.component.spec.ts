import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMiscComponent } from './upload-misc.component';

describe('UploadMiscComponent', () => {
  let component: UploadMiscComponent;
  let fixture: ComponentFixture<UploadMiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
