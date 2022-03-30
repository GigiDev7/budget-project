import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  isPasswordShown: Boolean = false;

  togglePasswordShow() {
    this.isPasswordShown = !this.isPasswordShown;
  }

  constructor() {}

  ngOnInit(): void {}
}
