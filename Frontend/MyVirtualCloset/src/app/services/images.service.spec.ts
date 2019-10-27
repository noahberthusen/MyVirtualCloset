import { TestBed } from '@angular/core/testing';

import { ImagesService } from './images.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ImagesService', () => {  
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: ImagesService = TestBed.get(ImagesService);
    expect(service).toBeTruthy();
  });

});
