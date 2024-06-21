import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})

export class BoxComponent {
  @Input() box!: { id: number, title: string, content: string, isSelected: boolean, color: string };
  @Output() selectBox = new EventEmitter<void>();

  onButtonClick(event: Event): void {
    event.stopPropagation();
    this.selectBox.emit();
  }
}
