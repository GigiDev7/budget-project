import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { UserModel } from '../auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: UserModel = {
    email: '',
    id: '',
    token: '',
  };

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post('http://localhost:5000/api/user/login', {
        email,
        password,
      })
      .pipe(
        tap((res: any) => {
          this.setToken(res);
          this.user.email = res.email;
          this.user.id = res.id;
          this.user.token = res.token;
        })
      );
  }

  private setToken(data: any) {
    localStorage.setItem('token', data.token);
  }

  logout() {
    localStorage.removeItem('token');
  }
}
