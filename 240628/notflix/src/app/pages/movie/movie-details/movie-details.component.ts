import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie, Cast, Video, Poster } from '../movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {
  movie!: Movie;
  cast: Cast[] = [];
  trailerUrl: string = '';
  posters: Poster[] = [];
  showTrailerModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieDetails(movieId).subscribe((movie: Movie) => {
        this.movie = movie;
        console.log('Movie Details: ', this.movie);
        console.log('Backdrop URL: ', this.getBackdropUrl(this.movie.backdrop_path));
      });

      this.movieService.getMovieCredits(movieId).subscribe((credits: Cast[]) => {
        this.cast = credits;
        console.log('Credits: ', this.cast);
      });

      this.movieService.getMovieVideos(movieId).subscribe((videos: any[]) => {
        const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailer) {
          this.trailerUrl = trailer.key;
        }
        console.log('Trailer URL: ', this.trailerUrl);
      });

      this.movieService.getMoviePosters(movieId).subscribe((posters: Poster[]) => {
        this.posters = posters;
        console.log('Posters: ', this.posters);
      });
    }
  }

  getBackdropUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w1280${path}`;
  }

  getPosterUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  getActorProfileUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  openTrailer() {
    this.showTrailerModal = true;
  }

  closeTrailerModal() {
    this.showTrailerModal = false;
  }
}