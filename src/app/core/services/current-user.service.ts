import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private apiUrl = 'https://dummyjson.com/auth/me';

  private readonly http = inject(HttpClient);

  public getCurrentUser() {
    return this.http.get(this.apiUrl);
  }
}
