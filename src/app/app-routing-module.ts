import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Users } from './features/users/users';
import { Todo } from './features/todo/todo';

const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  // { path: 'home', component: undefined },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users-module').then((m) => m.UsersModule),
  },
  { path: 'todo', component: Todo },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: undefined },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
