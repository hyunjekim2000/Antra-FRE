import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  page = 1;
  loading = false;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    console.log('MovieListComponent initialized');
    this.loadMovies();
  }

  loadMovies() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.movieService.getMovies(this.page).subscribe({
      next: (data: Movie[]) => {
        this.movies = [...this.movies, ...data];
        this.loading = false;
        console.log('Movies loaded:', this.movies);
      },
      error: (error) => {
        console.error('Failed to load movies:', error);
        this.loading = false;
      }
    });
  }

  onScroll() {
    console.log('Scroll event triggered');
    this.page++;
    this.loadMovies();
  }
}
