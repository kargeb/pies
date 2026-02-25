import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Topbar } from './core/layout/topbar/topbar';
import { Sidebar } from './core/layout/sidebar/sidebar';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { Loader } from './core/components';
import {
  authInterceptor,
  errorFn,
  ErrorInterceptor,
  loggingInterceptor,
} from './core/interceptors';
import { AuthModule } from './features/auth/auth-module';

const coreComponents = [Topbar, Sidebar];

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    coreComponents,
    Loader,
    AuthModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([
        loggingInterceptor,
        // errorFn,
        authInterceptor,
      ]),
    ),
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [App],
})
export class AppModule {}
