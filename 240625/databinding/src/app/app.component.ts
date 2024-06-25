import { Component } from '@angular/core';
import { us_cities } from './cities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'databinding';
  autocomplete: string[] = [];
  input = '';

  onSearchChange(searchValue: string): void {
    this.input = searchValue;
    if (searchValue) {
      this.autocomplete = us_cities.filter(city =>
        city.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    else {
      this.autocomplete = [];
    }
  }
}
