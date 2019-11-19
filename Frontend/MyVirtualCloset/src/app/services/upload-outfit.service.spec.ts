import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UploadOutfitService } from './upload-outfit.service';
import { Outfit } from 'src/app/models/Outfit';
import { of } from 'rxjs';


describe('UploadOutfitService', () => {
  let service: UploadOutfitService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadOutfitService],
      imports: [ 
        HttpClientTestingModule      
      ]
    })
    service = TestBed.get(UploadOutfitService);
  });

  it('should be created', () => {
    const service: UploadOutfitService = TestBed.get(UploadOutfitService);
    expect(service).toBeTruthy();
  });

});
