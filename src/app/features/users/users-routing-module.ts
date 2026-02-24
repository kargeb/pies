import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Users } from './users';
import { AddUser, AllUsers, UserDetails } from './containers';
import { AllUsersResolver } from './resolvers';
// import { AllUsers } from './containers/all-users/all-users';
// import { UserDetails } from './containers/user-details/user-details';
// import { AddUser } from './containers/add-user/add-user';

const routes: Routes = [
  {
    path: '',
    component: Users,
    children: [
      {
        path: 'all-users',
        component: AllUsers,
        // resolve: {
        //   allUsers: AllUsersResolver,
        // },
      },
      // { path: 'user-details', component: UserDetails },
      { path: 'user-details/:id', component: UserDetails },
      { path: 'add-user', component: AddUser },
      { path: '', redirectTo: 'all-users', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
