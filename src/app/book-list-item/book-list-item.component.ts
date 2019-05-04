import { Component, OnInit, Input } from '@angular/core';
import {Book} from '../shared/book';

@Component({
  selector: 'a.bs-book-list-item',
  templateUrl: './book-list-item.component.html',
  styles: []
})
export class BookListItemComponent implements OnInit {
  //Property Binding - wichtiges Konzept in Angular
  @Input() book: Book;

  constructor() { }

  ngOnInit() {
  }


}
