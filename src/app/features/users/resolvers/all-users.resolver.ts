import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  RedirectCommand,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from '../../../core/services/users.service';
import { User } from '../../../core/models/users.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllUsersResolver implements Resolve<User[]> {
  private readonly usersService = inject(UsersService);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<User[]> {
    console.log('🚀 ~ AllUsersResolver ~ resolve ~ state:', state);
    console.log('🚀 ~ AllUsersResolver ~ resolve ~ route:', route);

    return this.usersService.getAllUsers();
  }
}
