import { Component } from '@angular/core';

interface Box {
  id: number;
  title: string;
  content: string;
  isSelected: boolean;
  color: string;
}

@Component({
  selector: 'app-box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.css']
})

export class BoxListComponent {
  colors = ['blue', 'black', 'red', 'green'];
  boxes: Box[] = [];

  constructor() {
    this.initializeBoxes();
  }

  initializeBoxes(): void {
    const titles = [
      "Test 1",
      "Test 2",
      "Test 3",
      "Test 4",
    ];

    const contents = [
      "test 1",
      "test 2",
      "test3 ",
      "test 4",
    ];

    for (let i = 0; i < titles.length; i++) {
      this.boxes.push({
        id: i,
        title: titles[i],
        content: contents[i],
        isSelected: false,
        color: this.colors[i % this.colors.length]
      });
    }
  }

  onBoxSelected(box: Box): void {
    this.boxes.forEach(b => b.isSelected = false);
    box.isSelected = true;
  }
}
