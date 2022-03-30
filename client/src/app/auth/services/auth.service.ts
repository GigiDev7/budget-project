import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post('http://localhost:5000/api/user/login', {
        email,
        password,
      })
      .pipe(tap((res) => this.setToken(res)));
  }

  private setToken(data: any) {
    localStorage.setItem('token', data.token);
  }

  logout() {
    localStorage.removeItem('token');
  }
}
