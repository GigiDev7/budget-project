import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { URL } from '../../shared/constants/constants';

const data = {
  email: 'email',
  id: 'id',
  token: 'token',
  firstname: 'firstname',
  lastname: 'lastname',
  residence: 'residence',
};

describe('auth service test', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data on success', (done: DoneFn) => {
    service.login('email', 'psw').subscribe({
      next: (res) => {
        expect(res).toEqual(data);
        done();
      },
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${URL}/user/login`,
    });
    req.flush(data);
  });

  it('setUserData have to call on success', (done: DoneFn) => {
    spyOn(service as any, 'setUserData');

    service.login('email', 'psw').subscribe(() => {
      expect((service as any).setUserData).toHaveBeenCalledOnceWith(data);
      done();
    });
    const req = httpController.expectOne({
      method: 'POST',
      url: `${URL}/user/login`,
    });
    req.flush(data);
  });

  it('setUserData have not to call on error', (done: DoneFn) => {
    spyOn(service as any, 'setUserData');
    service.login('email', 'psw').subscribe({
      error: (e) => {
        expect((service as any).setUserData).not.toHaveBeenCalled();
        done();
      },
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${URL}/user/login`,
    });
    req.error(new ProgressEvent('401'));
  });
});
