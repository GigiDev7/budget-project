import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public onLogoutClick(): void {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

  constructor(private authService: AuthService, private router: Router) {}
}
