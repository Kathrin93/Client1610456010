import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Book, Image, Author } from '../shared/book';
import { BookStoreService } from "../shared/book-store.service";
import { AuthService } from "../shared/authentication-service";

@Component({
  selector: 'bs-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})
export class BookListComponent implements OnInit {

  books: Book[];
  currentUserId;
  //EventEmitter in Angular Doc durchlesen, Jetzt kann die BookList Component ein Ereignis feuern
    // Dieses Ergeignis können dann andere Komponente dann behandeln
    // feuern müssen dieses Event erst dann wenn auf ein Buch geklickt wird
  //@Output() showDetailsEvent = new EventEmitter<Book>();

  constructor(private bs : BookStoreService, private as : AuthService) {}

  //automatisch aufgerufen wenn Komponente geladen wird
  ngOnInit() {
      this.bs.getAll().subscribe(res => this.books = res);
      this.currentUserId;

  }

    addBooktoShoppingCard(book){



        let localKey = "user_" + "_cart";
        let books = [];
        let user_id = 0;

        if(this.as.isLoggedIn()){
            user_id = this.as.getCurrentUserId();
            localKey = "user_" + user_id.toString() + "_cart";
        }
        else{
            localKey = "user_default_cart";
        }

        console.log("localKey: " +localKey);


        let new_book = {
            user_id: user_id,
            amount: 1,
            isbn: "",
            price: 0
        };

        let currentStorage = localStorage.getItem(localKey);


        if(currentStorage) {

            console.log('test1')

            books = JSON.parse(localStorage.getItem(localKey));
            let founded = false;

            for(var i in books){
                if(books[i].isbn == book.isbn){
                    console.log('test1.1');
                    books[i].amount++;
                    books[i].price = book.amount * book.price;
                    localStorage.setItem(localKey, JSON.stringify(books));
                    founded = true;

                }
            }

            if(!founded){

                    console.log('test1.2');
                    new_book.price = book.price;
                    new_book.isbn = book.isbn;
                    new_book.amount = 1;
                    books.push(new_book);
                    localStorage.setItem(localKey, JSON.stringify(books));

            }
        }

        else{

            console.log('test0')
            new_book.price = book.price;
            new_book.isbn = book.isbn;
            new_book.amount = 1;
            books.push(new_book);
            localStorage.setItem(localKey, JSON.stringify(books));

        }


    }



}
