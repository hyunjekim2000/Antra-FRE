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
  private scrollRestored = false;
  private savedScrollPosition = 0;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    this.savedScrollPosition = this.scrollService.getPosition(this.scrollPositionKey)[0];

    this.movieService.getSavedMovies().subscribe(movies => {
      this.movies = movies;
      this.page = this.movieService.getCurrentPage();
      this.finished = this.movieService.isFinished();
      if (this.movies.length === 0) {
        this.loadMovies();
      } else {
        this.attemptRestoreScrollPosition();
      }
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart), takeUntil(this.notifier))
      .subscribe(() => {
        console.log('NavigationStart - saving scroll position');
        this.saveScrollPosition();
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd), takeUntil(this.notifier))
      .subscribe(() => {
        console.log('NavigationEnd - attempting to restore scroll position');
        this.attemptRestoreScrollPosition();
      });
  }

  ngAfterViewInit() {
    this.addManualScrollEventListener();
    setTimeout(() => {
      console.log('ngAfterViewInit - attempting to restore scroll position');
      this.attemptRestoreScrollPosition();
    }, 50);
  }

  ngOnDestroy() {
    console.log('ngOnDestroy - saving scroll position');
    this.saveScrollPosition();
    this.movieService.saveState(this.movies, this.page, this.finished);
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
        if (!this.scrollRestored && this.savedScrollPosition > 0) {
          this.attemptRestoreScrollPosition();
        }
        this.movieService.saveState(this.movies, this.page, this.finished);
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

  attemptRestoreScrollPosition() {
    const interval = setInterval(() => {
      const scrollContainer = document.querySelector('.scroll-container');
      if (scrollContainer) {
        const [vertical] = this.scrollService.getPosition(this.scrollPositionKey);
        console.log('Attempting to restore scroll position to:', vertical);
        if (scrollContainer.scrollHeight > vertical) {
          scrollContainer.scrollTo({ top: vertical, behavior: 'auto' });
          this.scrollRestored = true;
          clearInterval(interval);
        }
      }
    }, 100);
  }
}