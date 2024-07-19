import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, CanActivate, CanLoad } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.getUser();

    if (user?.jwtToken) {
      return true;
    } else {
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    const user = this.authService.getUser();
    if (user?.jwtToken) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
