import { TestBed } from '@angular/core/testing';

import { SignalRService } from './signal-r.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('SignalRService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ToastrModule.forRoot() 
    ]
  }));

  it('should be created', () => {
    const service: SignalRService = TestBed.get(SignalRService);
    expect(service).toBeTruthy();
  });
});
