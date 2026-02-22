import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { User } from '../../../../core/models/users.model';
import { UsersService } from '../../../../core/services/users.service';
import { Loader } from '../../../../core/components';
import { SingleUser } from '../../components/single-user/single-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  imports: [CommonModule, Loader, SingleUser],
  templateUrl: './all-users.html',
  styleUrl: './all-users.scss',
})
export class AllUsers {
  private readonly usersService = inject(UsersService);
  private readonly cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  public allUsers: WritableSignal<User[]> = signal([]);

  public totalUsers = computed(() => this.allUsers().length);

  public param1 = 'pies';
  public param2 = 'mszszsz';
  public isLoading = signal(false);

  public getAllUsers(): void {
    this.isLoading.set(true);
    this.usersService.getAllUsers().subscribe({
      next: (users) => {
        console.log('users:', users);
        this.allUsers.set(users);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log('err: ', err);
        // setTimeout(() => {
        this.isLoading.set(false);
        console.log('chuj: ', this.isLoading);
        // this.cdr.markForCheck();
        // }, 1000);
      },
      complete: () => {
        console.log('COMLEYE');
        // this.isLoading = false;
      },
    });
    // this.usersService.getAllUsers().subscribe(
    //   (users) => {
    //     console.log('users:', users);
    //     this.allUsers.set(users);
    //   },
    //   (err) => {
    //     console.log('err: ', err);
    //   },
    // );
  }

  public switchToUserDetails(id: string) {
    console.log('user id:', id);
    this.router.navigate(['/users/user-details', id]);
  }
}
