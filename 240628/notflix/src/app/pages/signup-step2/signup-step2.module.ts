import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupStep2Component } from './signup-step2.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupStep22Component } from './signup-step2-2/signup-step2-2.component';
import { SignupStep23Component } from './signup-step2-3/signup-step2-3.component';
import { SignupStep21Component } from './signup-step2-1/signup-step2-1.component';

const routes: Routes = [
  {
    path: '', component: SignupStep2Component, children: [
      { path: '', component: SignupStep21Component },
      { path: 'signup-step2-2', component: SignupStep22Component },
      { path: 'signup-step2-3', component: SignupStep23Component }
    ]
  }
];

@NgModule({
  declarations: [
    SignupStep2Component,
    SignupStep22Component,
    SignupStep23Component,
    SignupStep21Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SignupStep2Module { }