import { TestBed } from '@angular/core/testing';

import { SignupService } from './signup.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from '../models/User';
import { of } from 'rxjs';

describe('SignupService', () => {
  let service: SignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignupService],
      imports: [ 
        HttpClientTestingModule      
      ]
    })
  
    service = TestBed.get(SignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expect a user', () => {
    const spy = spyOn(service, 'signup').and.returnValue(
      of({
        id: '',
        firstName: 'S',
        lastName: 'Mitra',
        username: 'smitra',
        email: 'smitra@iastate.edu',
        password: '',
        role: 'User',
        token: '',
        salt: '',
        hash: ''
      })
    )
    service.signup(new User()).subscribe(data => {
      expect(data.firstName).toBe('S');
      // and everything else
    });

    expect(spy).toHaveBeenCalled();
  });
});
