import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, CanActivate, CanLoad } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../services/interfaces/user-auth.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class MovieItemGuard implements CanActivate, CanLoad {
  private jwtHelper = new JwtHelperService();

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.getUser();
    const { jwtToken, role } = user || {};

    console.log('JWT Token:', jwtToken);
    console.log('Role:', role);

    if ( jwtToken && role && (role === UserRole.ADMIN || role === UserRole.SUPERUSER)) {
      return true;
    } else {
      this.router.navigate(['/signup-step2/signup-step2-3'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    const user = this.authService.getUser();
    const { jwtToken, role } = user || {};

    console.log('JWT Token:', jwtToken);
    console.log('Role:', role);

    if ( jwtToken && role && (role === UserRole.ADMIN || role === UserRole.SUPERUSER)) {
      return true;
    } else {
      this.router.navigate(['/signup-step2/signup-step2-3']);
      return false;
    }
  }
}