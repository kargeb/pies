import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  private router = inject(Router);
  private authService = inject(AuthService);

  public goToLoginPage() {
    this.router.navigate(['/login']);
  }

  public logout() {
    this.authService.logout();
  }
}
