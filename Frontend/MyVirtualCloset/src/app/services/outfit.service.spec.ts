import { TestBed } from '@angular/core/testing';

import { OutfitService } from './outfit.service';

describe('OutfitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutfitService = TestBed.get(OutfitService);
    expect(service).toBeTruthy();
  });
});
