import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-avg',
  templateUrl: './rating-avg.component.html',
  styleUrl: './rating-avg.component.css'
})
export class RatingAvgComponent {
  @Input() ratings: { rate: number }[] = [];

  get averageRating() {
    const total = this.ratings.reduce((sum, rating) => sum + rating.rate, 0);
    return total / this.ratings.length;
  }

  get stars() {
    return Array(Math.floor(this.averageRating)).fill('filled');
  }

  get emptyStars() {
    return Array(5 - Math.floor(this.averageRating)).fill('empty');
  }
}
