import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Users } from './users';
import { AllUsers } from './components/all-users/all-users';

const routes: Routes = [
  {
    path: '',
    component: Users,
    children: [
      { path: 'all-users', component: AllUsers },
      //   { path: 'user-details', component: undefined },
      //   { path: 'add-suer', component: undefined },
      { path: '', redirectTo: 'all-users', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
