import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorFn: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      console.log('FUNCRTIONAL INTERCPETOR !!!!!!!');
      return throwError(() => new Error('PIESSSSSSS', err));
    }),
  );
};
