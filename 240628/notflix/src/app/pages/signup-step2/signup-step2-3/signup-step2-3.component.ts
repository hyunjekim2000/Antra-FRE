import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../../services/signup.service';
import { AuthService } from '../../../services/auth.service';
import { UserRole } from '../../../services/interfaces/user-auth.interface';

@Component({
  selector: 'app-signup-step2-3',
  templateUrl: './signup-step2-3.component.html',
  styleUrl: './signup-step2-3.component.scss'
})
export class SignupStep23Component implements OnInit {
  form: FormGroup;
  plans = [
    { value: 'basic', label: 'Basic Plan', role: UserRole.USER },
    { value: 'standard', label: 'Standard Plan', role: UserRole.ADMIN },
    { value: 'premium', label: 'Premium Plan', role: UserRole.SUPERUSER }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signupService: SignupService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      plan: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.prefillSignupDataForLoggedInUser();
  }

  prefillSignupDataForLoggedInUser() {
    const user = this.authService.getUser();
    if (user) {
      const { email, username } = user;
      const signupData = this.signupService.getSignupData();
      if (!signupData.email) signupData.email = email;
      if (!signupData.username) signupData.username = username;
      if (!signupData.tmdbKey) signupData.tmdbKey = 'defaultTmdbKey';
      this.signupService.updateSignupData(signupData);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const signupData = this.signupService.getSignupData();
      console.log('Signup Data:', signupData);

      const selectedPlan = this.plans.find(plan => plan.value === this.form.value.plan);
      if (!selectedPlan) {
        console.error('Invalid plan selected');
        return;
      }

      const { email, password, username, tmdbKey } = signupData;
      if (!email || !username || !tmdbKey) {
        console.error('Signup data is incomplete', { email, password, username, tmdbKey });
        return;
      }

      const requestBody = {
        email,
        password: password || '',
        username,
        role: selectedPlan.role,
        tmdb_key: tmdbKey
      };

      console.log('Request Body:', requestBody);

      const user = this.authService.getUser();
      if (user && user.jwtToken) {
        this.authService.upgradePermission(requestBody).subscribe({
          next: (response) => {
            console.log('Role upgrade successful', response);
            this.router.navigate(['/movies']);
          },
          error: (error) => {
            console.error('Role upgrade failed', error);
          }
        });
      } else {
        this.authService.signup(requestBody).subscribe({
          next: (response) => {
            console.log('Signup successful', response);
            this.signupService.clearSignupData();
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Signup failed', error);
          }
        });
      }
    } else {
      console.log('Form is invalid:', this.form.errors);
    }
  }
}