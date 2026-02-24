import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { getRandomInteger } from '../../core/utils/helpers';
import { UsersStateService } from '../../core/services';
import { Loader } from '../../core/components';

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  styleUrl: './users.scss',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Loader],
})
export class Users {
  private readonly usersStateService = inject(UsersStateService);

  public allUsers = this.usersStateService.users;
  public loading = this.usersStateService.loading;

  ngOnInit() {
    this.usersStateService.loadUsers();
  }

  // public goToUser(): void {
  //   const randomInteger: number = getRandomInteger(1, 10);
  //   console.log('randomInt: ', randomInteger);
  //   // this.router.navigate(['/users/user-details', randomInteger]);
  //   // this.router.navigate(['user-details', randomInteger]);
  // }
}
