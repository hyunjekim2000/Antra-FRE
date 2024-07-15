import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit, AfterViewInit {
  movies: Movie[] = [];
  page = 1;
  loading = false;
  finished = false;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  ngAfterViewInit() {
    this.addManualScrollEventListener();
  }

  loadMovies() {
    if (this.loading || this.finished) {
      console.log('Already loading or finished, skipping loadMovies call.');
      return;
    }
    this.loading = true;
    console.log('Loading movies for page:', this.page);
    this.movieService.getMovies(this.page).subscribe({
      next: (data: Movie[]) => {
        if (data.length === 0) {
          this.finished = true;
        }
        this.movies = [...this.movies, ...data];
        this.loading = false;
        console.log('Loaded movies:', data);
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.loading = false;
      }
    });
  }

  onScroll() {
    console.log('Scroll event triggered');
    if (!this.loading && !this.finished) {
      this.page++;
      this.loadMovies();
    } else {
      console.log('Ignoring scroll event, loading:', this.loading, 'finished:', this.finished);
    }
  }

  addManualScrollEventListener() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', this.manualScrollEvent);
    }
  }

  manualScrollEvent = () => {
    console.log('Manual scroll event detected');
  }
}
