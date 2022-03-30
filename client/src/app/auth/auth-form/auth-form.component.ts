import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  isPasswordShown: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  togglePasswordShow() {
    this.isPasswordShown = !this.isPasswordShown;
  }

  onFormSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe((userData) => {
      console.log(userData);
    });
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
