import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  isLogin = false;
  username = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userSignal.subscribe(user => {
      if (user && user.jwtToken) {
        this.isLogin = true;
        this.username = user.username || '';
      } else {
        this.isLogin = false;
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  signOut(): void {
    this.authService.logout();
    this.isLogin = false;
    this.username = '';
    this.router.navigate(['/']);
  }
}