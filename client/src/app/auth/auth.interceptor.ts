import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from './auth.model';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn()) {
      const user: UserModel = JSON.parse(localStorage.getItem('user')!);
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${user.token}`),
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
