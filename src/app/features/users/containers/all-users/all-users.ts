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
import { ActivatedRoute, Router } from '@angular/router';
import { UsersStateService } from '../../../../core/services';

@Component({
  selector: 'app-all-users',
  imports: [CommonModule, Loader, SingleUser],
  templateUrl: './all-users.html',
  styleUrl: './all-users.scss',
})
export class AllUsers {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private usersStateService = inject(UsersStateService);
  // public allUsers: WritableSignal<User[]> = signal([]);
  public allUsers = this.usersStateService.users;
  public totalUsers = this.usersStateService.totalUsers;

  public resolverAllUsers = signal<User[]>([]);

  // public totalUsers = computed(() => this.allUsers().length);

  public param1 = 'pies';
  public param2 = 'mszszsz';
  public isLoading = signal(false);

  constructor() {
    console.log('ALLL SUERES ');
  }

  ngOnInit() {
    // const resolverUsers: User[] = this.route.snapshot.data['allUsers'];
    // console.log('🚀 ~ AllUsers ~ ngOnInit ~ resolverUsers:', resolverUsers);
    // if (resolverUsers) {
    //   this.resolverAllUsers.set(resolverUsers);
    // } else {
    //   console.log('NO USERS IN RESOLVER');
    // }
  }

  // public getAllUsers(): void {
  //   this.isLoading.set(true);
  //   this.usersService.getAllUsers().subscribe({
  //     next: (users) => {
  //       console.log('users:', users);
  //       this.allUsers.set(users);
  //       this.isLoading.set(false);
  //     },
  //     error: (err) => {
  //       console.log('err: ', err);
  //       // setTimeout(() => {
  //       this.isLoading.set(false);
  //       console.log('chuj: ', this.isLoading);
  //       // this.cdr.markForCheck();
  //       // }, 1000);
  //     },
  //     complete: () => {
  //       console.log('COMLEYE');
  //     },
  //   });
  // }

  public refresh() {
    this.usersStateService.refreshUsers();
  }

  public switchToUserDetails(id: string) {
    console.log('user id:', id);
    this.router.navigate(['/users/user-details', id]);
  }
}
