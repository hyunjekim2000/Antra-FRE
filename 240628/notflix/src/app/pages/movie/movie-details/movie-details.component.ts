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
    this.route.data.subscribe(data => {
      this.movie = data['movie'];
      console.log('Resolved Movie Details: ', this.movie);

      this.movieService.getMovieCredits(this.movie.id.toString()).subscribe((credits: Cast[]) => {
        this.cast = credits;
        console.log('Credits: ', this.cast);
      });

      this.movieService.getMovieVideos(this.movie.id.toString()).subscribe((videos: any[]) => {
        const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailer) {
          this.trailerUrl = trailer.key;
        }
        console.log('Trailer URL: ', this.trailerUrl);
      });

      this.movieService.getMoviePosters(this.movie.id.toString()).subscribe((posters: Poster[]) => {
        this.posters = posters;
        console.log('Posters: ', this.posters);
      });
    });
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