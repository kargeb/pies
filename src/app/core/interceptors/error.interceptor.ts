import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        console.log('errro interce[', err);
        return throwError(() => new Error('DUPA'));
      }),
      tap({
        next: ($event) => {
          console.log('INTERCEPT event TEN Z ERROR, ', $event);
        },
      }),
    );
  }
}
