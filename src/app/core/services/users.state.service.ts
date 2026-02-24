import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../models/users.model';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersStateService {
  private readonly usersService = inject(UsersService);

  private _users = signal<User[]>([]);
  private _loading = signal<boolean>(false);

  public users = this._users.asReadonly();
  public loading = this._loading.asReadonly();

  public totalUsers = computed(() => this.users().length);

  public loadUsers(): void {
    if (this._users().length > 0) {
      return;
    }

    this._loading.set(true);

    this.usersService
      .getAllUsers()
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (users) => {
          console.log('🚀 ~ UsersStateService ~ loadUsers ~ users:', users);
          this._users.set(users);
        },
        error: (err) => {
          console.error('Error logging users', err);
        },
      });
  }

  public refreshUsers(): void {
    this._users.set([]);
    this.loadUsers();
  }
}
