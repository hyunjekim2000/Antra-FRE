import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './movie-details.component';
import { RouterModule, Routes } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';

const routes: Routes = [
  { path: '', component: MovieDetailsComponent }
];

@NgModule({
  declarations: [MovieDetailsComponent],
  imports: [
    CommonModule,
    YouTubePlayerModule,
    RouterModule.forChild(routes)
  ]
})
export class MovieDetailsModule { }
