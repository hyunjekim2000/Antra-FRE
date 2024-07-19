import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor working...')
    const authToken = localStorage.getItem('accessToken');

    if (authToken) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });

      return next.handle(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.logout();
          }
          return throwError(error);
        })
      );
    }

    return next.handle(req);
  }
}
