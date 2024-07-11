import { Component, Input } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.scss'
})
export class MovieItemComponent {
  @Input() movie!: Movie;
  
  getPosterUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500/${path}`;
  }
}
