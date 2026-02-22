import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { User } from '../../../../core/models/users.model';
import { UsersService } from '../../../../core/services/users.service';
import { Loader } from '../../../../core/components';
import { SingleUser } from '../../components/single-user/single-user';

@Component({
  selector: 'app-all-users',
  imports: [CommonModule, Loader, SingleUser],
  templateUrl: './all-users.html',
  styleUrl: './all-users.scss',
})
export class AllUsers {
  private readonly usersService = inject(UsersService);
  public allUsers: WritableSignal<User[]> = signal([]);

  public getAllUsers(): void {
    this.usersService.getAllUsers().subscribe({
      next: (users) => {
        console.log('users:', users);
        this.allUsers.set(users);
      },
      error: (err) => {
        console.log('err: ', err);
      },
      complete: () => {
        console.log('COMLEYE');
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
}
