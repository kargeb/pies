import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { finalize, tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();
  let status: string;

  return next(req).pipe(
    tap({
      // Sprawdzamy czy odpowiedź to faktycznie dane z serwera (HttpResponse)
      next: (event) => {
        if (event instanceof HttpResponse) {
          status = 'succeeded';
        }
      },
      error: () => (status = 'failed'),
    }),
    finalize(() => {
      const elapsedTime = Date.now() - startTime;
      // Wypisujemy czytelny log w konsoli
      console.log(
        `INTERCEPT   [HTTP] ${req.method} "${req.urlWithParams}" ${status} in ${elapsedTime}ms`,
      );
    }),
  );
};
