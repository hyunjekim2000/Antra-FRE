import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from '../movie.service';
import { Movie } from '../../pages/movie/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailResolver implements Resolve<Movie> {
  constructor(private movieService: MovieService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie> {
    // console.log('resolver running...')
    const id = route.paramMap.get('id');
    return this.movieService.getMovieDetails(id!);
  }
}
