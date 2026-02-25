import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Todo } from './features/todo/todo';
import { Auth } from './features/auth/auth';
import { authGuard } from './core/guards';
import { NotFound } from './core/layout/not-found/not-found';

const routes: Routes = [
  {
    path: 'login',
    component: Auth,
  },
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard],
  },
  // { path: 'home', component: undefined },
  {
    path: 'users',
    loadChildren: () => import('./features/users').then((m) => m.UsersModule),
    canActivate: [authGuard],
    // import('./features/users/users-module').then((m) => m.UsersModule),
  },
  { path: 'todo', component: Todo, canActivate: [authGuard] },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    // canActivate: [authGuard],
  },
  { path: '**', component: NotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
