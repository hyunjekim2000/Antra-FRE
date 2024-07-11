import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-step1',
  templateUrl: './signup-step1.component.html',
  styleUrl: './signup-step1.component.scss'
})
export class SignupStep1Component {
  constructor(private router: Router) {

  }

  goToNextStep() {
    this.router.navigate(['/signup-step2']);
  }
}
