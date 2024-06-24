import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-indiv',
  templateUrl: './rating-indiv.component.html',
  styleUrl: './rating-indiv.component.css'
})
export class RatingIndivComponent {
  @Input() name: string = '';
  @Input() content: string = '';
  @Input() rate: number = 0;

  get stars() {
    return Array(Math.floor(this.rate)).fill('filled');
  }

  get emptyStars() {
    return Array(5 - Math.floor(this.rate)).fill('empty');
  }
}
