import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movie';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiKey = '';
  private apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}`;

  constructor(private http: HttpClient) {}

  getMovies(page: number = 1): Observable<Movie[]> {
    return this.http.get<{ results: Movie[] }>(`${this.apiUrl}&page=${page}`).pipe(
      map(response => response.results)
    );
  }
}
