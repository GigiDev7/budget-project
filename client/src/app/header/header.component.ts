import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../shared/models/auth.model';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public fullname: string = '';
  public urlPath: string = '';

  public onLogoutClick(): void {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {
    const user: UserModel = JSON.parse(localStorage.getItem('user')!);
    this.fullname = `${user?.firstname} ${user?.lastname}`;
    this.urlPath = this.router.url;
  }
}
