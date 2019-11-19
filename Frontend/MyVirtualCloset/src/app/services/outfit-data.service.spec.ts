import { TestBed } from '@angular/core/testing';

import { OutfitDataService } from './outfit-data.service';

describe('OutfitDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutfitDataService = TestBed.get(OutfitDataService);
    expect(service).toBeTruthy();
  });
});
