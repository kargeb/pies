import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Topbar } from './core/layout/topbar/topbar';
import { Sidebar } from './core/layout/sidebar/sidebar';

const coreComponents = [Topbar, Sidebar];

@NgModule({
  declarations: [App],
  imports: [BrowserModule, AppRoutingModule, coreComponents],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
