import { TestBed } from '@angular/core/testing';
import { User } from '../models/User';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('AuthService', () => {
  let service: AuthService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ]
    })
  
    service = TestBed.get(AuthService);
  });


  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  
  it('should expect a user', () => {
    const spy = spyOn(service, 'login').and.returnValue(
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
    service.login(new User()).subscribe(data => {
      expect(data.username).toBe('smitra');
      expect(data.lastName).toBe('Mitra');
      expect(data.role).toBe('User');
    });

    expect(spy).toHaveBeenCalled();
  });

  
  it('tests forgotPassword', () => {
    const spy = spyOn(service, 'forgotPassword').and.returnValue(
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
    service.forgotPassword(new User()).subscribe(data => {
      expect(data.username).toBe('smitra');
      expect(data.lastName).toBe('Mitra');
      expect(data.role).toBe('User');
    });
    expect(spy).toHaveBeenCalled();
  });

    it('tests changePassword', () => {
      const spy = spyOn(service, 'changePassword').and.returnValue(
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
      service.changePassword(new User()).subscribe(data => {
        expect(data.username).toBe('smitra');
        expect(data.lastName).toBe('Mitra');
        expect(data.role).toBe('User');
      });
      expect(spy).toHaveBeenCalled();
    });


  

});
