import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../../services/signup.service';

@Component({
  selector: 'app-signup-step2-2',
  templateUrl: './signup-step2-2.component.html',
  styleUrl: './signup-step2-2.component.scss'
})
export class SignupStep22Component implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private signupService: SignupService) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      tmdbKey: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      this.signupService.updateSignupData(this.form.value);
      this.router.navigate(['/signup-step2/signup-step2-3']);
    }
  }
}