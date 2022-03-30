import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = {};

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post('http://localhost:5000/api/user/login', {
      email,
      password,
    });
  }
}
