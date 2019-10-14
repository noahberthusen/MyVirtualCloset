import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildOutfitComponent } from './build-outfit.component';

describe('BuildOutfitComponent', () => {
  let component: BuildOutfitComponent;
  let fixture: ComponentFixture<BuildOutfitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildOutfitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildOutfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
