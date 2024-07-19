import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list.component';
import { RouterModule, Routes } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { MovieItemComponent } from '../movie-item/movie-item.component';

const routes: Routes = [
  { path: '', component: MovieListComponent }
];

@NgModule({
  declarations: [
    MovieListComponent,
    MovieItemComponent,
  ],
  imports: [
    CommonModule,
    InfiniteScrollDirective,
    RouterModule.forChild(routes)
  ]
})
export class MovieListModule { }
