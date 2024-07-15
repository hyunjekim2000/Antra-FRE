import { Component, Input } from '@angular/core';
import { Movie } from '../movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.scss'
})
export class MovieItemComponent {
  @Input() movie!: Movie;

  constructor(private router: Router) {}

  getPosterUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  goToDetails(id: number): void {
    this.router.navigate(['/movies', id.toString()]);
  }
}