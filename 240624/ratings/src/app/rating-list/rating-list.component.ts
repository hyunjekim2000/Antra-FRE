import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrl: './rating-list.component.css'
})

export class RatingListComponent {
  @Input() ratings: { name: string; content: string; rate: number }[] = [];
}
