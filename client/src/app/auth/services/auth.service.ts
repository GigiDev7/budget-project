import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserModel } from '../auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: UserModel = {
    email: '',
    id: '',
    token: '',
  };

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
          this.user = res;
        })
      );
  }

  private setToken(data: any) {
    localStorage.setItem('token', data.token);
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.user.email = '';
    this.user.id = '';
    this.user.token = '';
  }
}
