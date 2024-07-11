import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-step2',
  templateUrl: './signup-step2.component.html',
  styleUrl: './signup-step2.component.scss'
})
export class SignupStep2Component implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [''],
      password:[''],
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
