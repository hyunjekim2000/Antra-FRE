import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login/login.component';
import { SignupStep1Component } from './pages/signup-step1/signup-step1.component';
import { SignupStep2Component } from './pages/signup-step2/signup-step2.component';
import { MovieListComponent } from './pages/movie/movie-list/movie-list.component';
import { MovieDetailsComponent } from './pages/movie/movie-details/movie-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup-step1', component: SignupStep1Component },
  { path: 'signup-step2', component: SignupStep2Component},
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'movies', component: MovieListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
