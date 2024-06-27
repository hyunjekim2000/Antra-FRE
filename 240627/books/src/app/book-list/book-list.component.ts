import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BookService } from '../book.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  searchControl = new FormControl();

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getDefaultBooks().subscribe(books => {
      this.books = books;
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      if (value) {
        this.bookService.searchBooks(value).subscribe(books => {
          this.books = books;
        });
      } else {
        this.bookService.getDefaultBooks().subscribe(books => {
          this.books = books;
        });
      }
    });
  }
}
