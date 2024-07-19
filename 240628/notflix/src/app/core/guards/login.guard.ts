import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const user = this.authService.getUser();
    if (!user?.jwtToken) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
