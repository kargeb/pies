import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Todo } from './features/todo/todo';
import { Auth } from './features/auth/auth';

const routes: Routes = [
  {
    path: 'login',
    component: Auth,
  },
  {
    path: 'home',
    component: Home,
  },
  // { path: 'home', component: undefined },
  {
    path: 'users',
    loadChildren: () => import('./features/users').then((m) => m.UsersModule),
    // import('./features/users/users-module').then((m) => m.UsersModule),
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
