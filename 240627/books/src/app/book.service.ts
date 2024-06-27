import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiURL = 'https://www.googleapis.com/books/v1/volumes?q=';

  constructor(private http: HttpClient) { }

  private filterBooks(books: any[]): any[] {
    return books.filter(book => 
      book.volumeInfo.imageLinks &&
      book.volumeInfo.title &&
      book.volumeInfo.publisher &&
      book.volumeInfo.publishedDate &&
      book.volumeInfo.description
    );
  }

  searchBooks(bookName: string): Observable<any> {
    return this.http.get(`${this.apiURL}${bookName}`).pipe(
      map((response: any) => this.filterBooks(response.items || []))
    );
  }

  getDefaultBooks(): Observable<any> {
    const defaultSearchTerm = 'programming'; // You can change this to any term you prefer
    return this.searchBooks(defaultSearchTerm);
  }
}
