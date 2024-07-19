import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupStep1Component } from './signup-step1.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: SignupStep1Component }
];

@NgModule({
  declarations: [SignupStep1Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SignupStep1Module { }
