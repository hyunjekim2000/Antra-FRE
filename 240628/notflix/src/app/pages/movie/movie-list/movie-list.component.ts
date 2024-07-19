import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { ScrollService } from '../../../services/scroll.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit, AfterViewInit, OnDestroy {
  movies: Movie[] = [];
  page = 1;
  loading = false;
  finished = false;
  private scrollPositionKey = 'movie-list-scroll-position';
  private notifier = new Subject();

  constructor(
    private movieService: MovieService,
    private router: Router,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    this.loadMovies();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart), takeUntil(this.notifier))
      .subscribe(() => {
        console.log('NavigationStart - saving scroll position');
        this.saveScrollPosition();
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd), takeUntil(this.notifier))
      .subscribe(() => {
        console.log('NavigationEnd - restoring scroll position');
        this.restoreScrollPosition();
      });
  }

  ngAfterViewInit() {
    this.addManualScrollEventListener();
    setTimeout(() => {
      console.log('ngAfterViewInit - restoring scroll position');
      this.restoreScrollPosition();
    }, 50);
  }

  ngOnDestroy() {
    console.log('ngOnDestroy - saving scroll position');
    this.saveScrollPosition();
    this.notifier.next(null);
    this.notifier.complete();
  }

  loadMovies() {
    if (this.loading || this.finished) {
      return;
    }
    this.loading = true;
    this.movieService.getMovies(this.page).subscribe({
      next: (data: Movie[]) => {
        if (data.length === 0) {
          this.finished = true;
        }
        this.movies = [...this.movies, ...data];
        this.loading = false;
        this.checkScroll();
        this.restoreScrollPosition();
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }

  onScroll() {
    if (!this.loading && !this.finished) {
      this.page++;
      this.loadMovies();
    }
  }

  addManualScrollEventListener() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', this.manualScrollEvent);
    }
  }

  manualScrollEvent = () => {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      const threshold = 50;
      if (scrollHeight - scrollTop <= clientHeight + threshold) {
        this.onScroll();
      }
    }
  };

  checkScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      if (scrollHeight <= clientHeight && !this.loading && !this.finished) {
        this.page++;
        this.loadMovies();
      }
    }
  }

  saveScrollPosition() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      const scrollPosition = scrollContainer.scrollTop;
      console.log('Saving scroll position:', scrollPosition);
      this.scrollService.setPosition(this.scrollPositionKey, scrollPosition, 0);
    }
  }

  restoreScrollPosition() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      const [vertical, horizontal] = this.scrollService.getPosition(this.scrollPositionKey);
      console.log('Restoring scroll position to:', vertical);
      scrollContainer.scrollTo({ top: vertical, behavior: 'auto' });
    }
  }
}