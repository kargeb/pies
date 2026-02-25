import { Component, inject, signal } from '@angular/core';
import { CurrentUserService } from '../../../../core/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-user',
  imports: [CommonModule],
  templateUrl: './current-user.html',
  styleUrl: './current-user.scss',
})
export class CurrentUser {
  private readonly currentUserService = inject(CurrentUserService);

  public currentUser = signal<any>(null);

  public getCurrentUser() {
    this.currentUserService.getCurrentUser().subscribe({
      next: (resp) => {
        console.log('CURRENT USER RESP:', resp);
        this.currentUser.set(resp);
      },
      error: (err) => console.log('err: ', err),
    });
  }
}
