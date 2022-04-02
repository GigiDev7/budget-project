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
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn() && this.isTokenExpired()) {
      this.authService.logout();
      this.router.navigateByUrl('login');
      return next.handle(req);
    } else if (this.authService.isLoggedIn()) {
      const user: UserModel = JSON.parse(localStorage.getItem('user')!);
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${user.token}`),
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }

  private isTokenExpired(): boolean {
    const helper = new JwtHelperService();
    const user: UserModel = JSON.parse(localStorage.getItem('user')!);
    const isExpired = helper.isTokenExpired(user.token);
    return isExpired;
  }
}
