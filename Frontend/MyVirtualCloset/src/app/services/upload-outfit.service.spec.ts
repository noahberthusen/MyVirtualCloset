import { TestBed } from '@angular/core/testing';

import { UploadOutfitService } from './upload-outfit.service';

describe('UploadOutfitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadOutfitService = TestBed.get(UploadOutfitService);
    expect(service).toBeTruthy();
  });
});
