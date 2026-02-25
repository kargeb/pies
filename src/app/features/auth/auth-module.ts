import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from './auth';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [Auth],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AuthModule {}
