import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {
  @Output() scrolled = new EventEmitter<void>();

  constructor() {
    console.log('InfiniteScrollDirective initialized');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    console.log('Window scrolled');
    const threshold = 300;
    const position = window.scrollY + window.innerHeight;
    const height = document.documentElement.scrollHeight;

    console.log(`Position: ${position}, Height: ${height}, Threshold: ${threshold}`);

    if (position > height - threshold) {
      console.log('Scrolled to bottom, emitting event');
      this.scrolled.emit();
    }
  }
}
