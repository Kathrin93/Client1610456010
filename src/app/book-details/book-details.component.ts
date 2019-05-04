import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { Book } from '../shared/book';
import {ActivatedRoute, Router} from "@angular/router";
import { BookStoreService } from "../shared/book-store.service";
import {AuthService} from "../shared/authentication-service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {

  @Input() book : Book;
  //@Output() showListEvent = new EventEmitter<any>();

  //Dependency Injection , Zu verfügung stellen
  constructor(private bs: BookStoreService, private router: Router, private route: ActivatedRoute, private as : AuthService) {

  }

  ngOnInit() {
    const params = this.route.snapshot.params;

      this.bs.getSingle(params['isbn']).subscribe(
       //verkürzte lambda schreibweise von ES6 für function die datafromobservable übergibt
       datafromObservable =>this.book = datafromObservable
   );
  }

  removeBook(){
        if (confirm("Buch wirklich löschen?")){
            this.bs.remove(this.book.isbn)
                .subscribe(res=>this.router.navigate(['../'],
                {relativeTo: this.route}
            ));
        }
    }

    addBooktoShoppingCard(){

        let  localKey = "user_default_cart";
        let books = [];
        let user_id = 0;

        if(this.as.isLoggedIn()){
            user_id = this.as.getCurrentUserId();
            localKey = "user_" + user_id.toString() + "_cart";
        }
        else{
            localKey = "user_default_cart";
        }

        let new_book = {
            user_id: 1,
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
                if(books[i].isbn == this.book.isbn){
                    console.log('test1.1');
                    books[i].amount++;
                    books[i].price = books[i].amount * this.book.price;
                    localStorage.setItem(localKey, JSON.stringify(books));
                    founded = true;

                }
            }

            if(!founded){

                console.log('test1.2');
                new_book.isbn = this.book.isbn;
                new_book.price = this.book.price ;
                books.push(new_book);
                localStorage.setItem(localKey, JSON.stringify(books));

            }
        }

        else{


            new_book.isbn = this.book.isbn;
            new_book.price = this.book.price ;
            books.push(new_book);
            localStorage.setItem(localKey, JSON.stringify(books));

        }


    }




  getRating (num: number){
    return new Array(num);
  }

    isLoggedIn(){
      return this.as.isLoggedIn();
    }

  /*
  showBookList(){
    this.showListEvent.emit();
  }*/

}
