import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserModel } from '../../shared/models/auth.model';
import { URL } from '../../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${URL}/user/login`, {
        email,
        password,
      })
      .pipe(
        tap((res: any) => {
          this.setUserData(res);
        })
      );
  }

  private setUserData(userData: UserModel): void {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  public isLoggedIn(): boolean {
    const user: UserModel | null = JSON.parse(localStorage.getItem('user')!);
    return !!user;
  }

  public logout(): void {
    localStorage.removeItem('user');
  }
}
