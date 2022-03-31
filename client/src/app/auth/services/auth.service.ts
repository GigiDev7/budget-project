import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post('http://localhost:5000/api/user/login', {
        email,
        password,
      })
      .pipe(
        tap((res: any) => {
          this.setToken(res);
        })
      );
  }

  private setToken(data: any): void {
    localStorage.setItem('token', data.token);
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  public logout(): void {
    localStorage.removeItem('token');
  }
}
