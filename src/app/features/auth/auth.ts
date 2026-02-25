import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services';
import { Router } from '@angular/router';
import { LoginRequest } from '../../core/models';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public errorMessage = signal('');

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  public onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    // if(username == null || )

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (!username || !password) {
      return;
    }

    const credentials: LoginRequest = {
      username,
      password,
    };

    console.log('credentials: ', credentials);

    this.authService.login(credentials).subscribe({
      next: (resp) => {
        console.log('resp login success:', resp);
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.log('err login: ', err);
        this.errorMessage.set('Wrong Login or Pasword');
      },
    });
  }
}
