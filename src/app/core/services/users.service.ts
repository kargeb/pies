import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http: HttpClient = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/users';

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  public getUserDetails(id: string): Observable<User> {
    if (!id) {
      throw new Error('no id!');
    }

    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
