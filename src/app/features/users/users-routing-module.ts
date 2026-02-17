import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Users } from './users';
import { AllUsers } from './components/all-users/all-users';
import { UserDetails } from './components/user-details/user-details';
import { AddUser } from './components/add-user/add-user';

const routes: Routes = [
  {
    path: '',
    component: Users,
    children: [
      { path: 'all-users', component: AllUsers },
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
