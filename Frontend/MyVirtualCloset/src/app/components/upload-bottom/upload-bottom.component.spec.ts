import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBottomComponent } from './upload-bottom.component';

describe('UploadBottomComponent', () => {
  let component: UploadBottomComponent;
  let fixture: ComponentFixture<UploadBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
