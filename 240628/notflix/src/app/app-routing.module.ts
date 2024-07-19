import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { MovieItemGuard } from './core/guards/movie-item.guard';
import { MoviesGuard } from './core/guards/movies.guard';
import { MovieDetailResolver } from './core/resolvers/movie-detail.resolver';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login/login.module').then(m => m.LoginModule), canActivate: [LoginGuard] },
  { path: 'signup-step1', loadChildren: () => import('./pages/signup-step1/signup-step1.module').then(m => m.SignupStep1Module) },
  { path: 'signup-step2', loadChildren: () => import('./pages/signup-step2/signup-step2.module').then(m => m.SignupStep2Module) },
  { path: 'movies/:id', loadChildren: () => import('./pages/movie/movie-details/movie-details.module').then(m => m.MovieDetailsModule), canActivate: [MovieItemGuard], resolve: { movie: MovieDetailResolver } },
  { path: 'movies', loadChildren: () => import('./pages/movie/movie-list/movie-list.module').then(m => m.MovieListModule), canActivate: [MoviesGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
