import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie, Cast, Video, Poster } from './movie';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '36a8f6d0aeb9d40651d72d1baf20cb45';
  private apiUrl = `https://api.themoviedb.org/3`;
  private moviesStateKey = 'movies-state';
  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  private pageSubject = new BehaviorSubject<number>(1);
  private finishedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.restoreState();
  }

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

  getSavedMovies(): Observable<Movie[]> {
    return this.moviesSubject.asObservable();
  }

  getCurrentPage(): number {
    return this.pageSubject.value;
  }

  isFinished(): boolean {
    return this.finishedSubject.value;
  }

  saveState(movies: Movie[], page: number, finished: boolean): void {
    const state = {
      movies,
      page,
      finished
    };
    localStorage.setItem(this.moviesStateKey, JSON.stringify(state));
    this.moviesSubject.next(movies);
    this.pageSubject.next(page);
    this.finishedSubject.next(finished);
  }

  restoreState(): void {
    const state = JSON.parse(localStorage.getItem(this.moviesStateKey) || '{}');
    this.moviesSubject.next(state.movies || []);
    this.pageSubject.next(state.page || 1);
    this.finishedSubject.next(state.finished || false);
  }

  clearState(): void {
    localStorage.removeItem(this.moviesStateKey);
    this.moviesSubject.next([]);
    this.pageSubject.next(1);
    this.finishedSubject.next(false);
  }
}