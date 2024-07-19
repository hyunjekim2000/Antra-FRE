import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError, debounceTime, first, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { SignupService } from '../../../services/signup.service';

@Component({
  selector: 'app-signup-step2-1',
  templateUrl: './signup-step2-1.component.html',
  styleUrl: './signup-step2-1.component.scss'
})
export class SignupStep21Component implements OnInit {

  form!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private signupService: SignupService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], [this.emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return control.valueChanges.pipe(
        debounceTime(500),
        tap(() => {
          console.log('Email input changed:', control.value);
          this.isLoading = true;
        }),
        switchMap(() => this.authService.checkEmail(control.value).pipe(
          tap((response: boolean) => {
            console.log('Email availability (raw response):', response);
            this.isLoading = false;
          }),
          map((response: boolean) => {
            console.log('Email availability (mapped):', response ? { hasemail: true } : null);
            return response ? { hasemail: true } : null;
          }),
          catchError(error => {
            console.error('Email validation error:', error);
            this.isLoading = false;
            return of(null);
          })
        )),
        first()
      );
    };
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submission:', this.form.value);
      this.signupService.updateSignupData(this.form.value);
      this.router.navigate(['signup-step2/signup-step2-2']);
    } else {
      console.log('Form is invalid:', this.form.errors);
    }
  }
}