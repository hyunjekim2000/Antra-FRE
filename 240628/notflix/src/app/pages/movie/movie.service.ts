import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, Cast, Video, Poster } from './movie';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '';
  private apiUrl = `https://api.themoviedb.org/3`;

  constructor(private http: HttpClient) {}

  getMovies(page: number = 1): Observable<Movie[]> {
    return this.http.get<{ results: Movie[] }>(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&page=${page}`).pipe(
      map(response => {
        if (response && response.results) {
          return response.results;
        } else {
          throw new Error('Invalid response format');
        }
      }),
    );
  }

  getMovieDetails(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  getMovieCredits(id: string): Observable<Cast[]> {
    return this.http.get<{ cast: Cast[] }>(`${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}`).pipe(
      map(response => response.cast)
    );
  }

  getMovieVideos(id: string): Observable<Video[]> {
    return this.http.get<{ results: Video[] }>(`${this.apiUrl}/movie/${id}/videos?api_key=${this.apiKey}`).pipe(
      map(response => response.results)
    );
  }

  getMoviePosters(id: string): Observable<Poster[]> {
    return this.http.get<{ posters: Poster[] }>(`${this.apiUrl}/movie/${id}/images?api_key=${this.apiKey}`).pipe(
      map(response => response.posters)
    );
  }
}