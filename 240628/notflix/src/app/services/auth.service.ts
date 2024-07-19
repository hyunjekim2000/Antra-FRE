import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AppUserAuth, AuthDto, UserRole } from './interfaces/user-auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authServerPath = 'http://localhost:5566/api/v1';
  private userSubject = new BehaviorSubject<AppUserAuth | null>(null);
  userSignal = this.userSubject.asObservable();
  private jwtHelper = new JwtHelperService();
  private appUserRegister = {
    username: '',
    password: '',
    email: '',
    role: UserRole.USER,
    tmdb_key: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  login(appUser: { email: string; password: string }): Observable<AuthDto> {
    return this.http
      .post<AuthDto>(`${this.authServerPath}/auth/signin`, appUser)
      .pipe(
        tap((response: AuthDto) => {
          this.setUserValueByToken(response);
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('Something went wrong during sign-in!', error);
        })
      );
  }

  signup(userRole: { role: UserRole }): Observable<AuthDto | string> {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userRole,
    };
    const { username, password, email, role, tmdb_key } = this.appUserRegister;

    if (!username || !password || !email || !role || !tmdb_key) return of('Register failed');

    return this.http
      .post<AuthDto>(
        [this.authServerPath, 'auth', 'signup'].join('/'),
        this.appUserRegister,
      )
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          this.router.navigate(['/login']);
        }),
        catchError((error) => {
          return throwError('Something went wrong during sign up!', error);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.userSubject.next(null);
    this.router.navigate(['/home']);
  }

  getUser(): AppUserAuth | null {
    return this.userSubject.value;
  }

  checkIfLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  private setUserValueByToken = ({ accessToken, role }: AuthDto) => {
    localStorage.setItem('accessToken', accessToken);

    const { id, username, email, exp } = this.jwtHelper.decodeToken(accessToken);

    const user: AppUserAuth = {
      id,
      username,
      email,
      role,
      jwtToken: accessToken,
    };
    this.userSubject.next(user);
  };

  upgradePermission(requestBody: { email: string; password: string; username: string; role: UserRole; tmdb_key: string }): Observable<AuthDto> {
    console.log('Change permission to: ', requestBody.role);
  
    return this.http
      .patch<AuthDto>(
        [this.authServerPath, 'auth', 'userupdate'].join('/'),
        requestBody,
      )
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          console.log('Updated role to:', role);
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('Something went wrong during role upgrade!', error);
        }),
      );
  }
  

  checkEmail(email: string): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.authServerPath}/auth/check-email`, { email })
      .pipe(
        map((response: boolean) => response),
        catchError(() => of(false))
      );
  }
}