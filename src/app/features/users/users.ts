import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { getRandomInteger } from '../../core/utils/helpers';

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  styleUrl: './users.scss',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class Users {
  private readonly router = inject(Router);
  public goToUser(): void {
    const randomInteger: number = getRandomInteger(1, 10);
    console.log('randomInt: ', randomInteger);

    this.router.navigate(['/users/user-details', randomInteger]);
    // this.router.navigate(['user-details', randomInteger]);
  }
}
