import { Component, OnInit , Input} from '@angular/core';
import { Book, Image, Author } from '../shared/book';
import { BookStoreService } from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/authentication-service";

@Component({
  selector: 'bs-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styles: []
})
export class ShoppingCartComponent implements OnInit {

    books: Book[];
    booksincart = [];
    local_booksincart = [];
    steuersatz = 0.1;
    localKey;

    constructor(private bs : BookStoreService, private route: ActivatedRoute, private router: Router, private as : AuthService) {}

    //automatisch aufgerufen wenn Komponente geladen wird
    ngOnInit() {


        let user_id = 0;
        this.localKey = "user_default_cart";

        if(this.as.isLoggedIn()){
            user_id = this.as.getCurrentUserId();
            this.localKey = "user_" + user_id.toString() + "_cart";
        }
        else {
            this.localKey = "user_default_cart";
        }





        const booksInCart = JSON.parse(localStorage.getItem(this.localKey));

        booksInCart.forEach(bookOrder => {
            this.bs.getSingle(bookOrder.isbn).subscribe(result => {
                result.amount = bookOrder.amount;
                this.booksincart.push(result);

            });

        });

        console.log(this.booksincart);



        }

        isLoggedIn(){
            return this.as.isLoggedIn();
        }


    getLink(isbn){
        return "../books/" + isbn;
    }





    deleteBookfromShoppingcard(isbn_number) {
        this.local_booksincart = JSON.parse(localStorage.getItem(this.localKey));

        for (var i in this.local_booksincart) {
            if (this.local_booksincart[i].isbn == isbn_number) {
                this.local_booksincart.splice(Number(i), 1);
                console.log("test: " + this.local_booksincart);
                localStorage.setItem(this.localKey, JSON.stringify(this.local_booksincart));
            }
        }
        console.log("test2222: " + this.local_booksincart);

        let booksInCart = JSON.parse(localStorage.getItem(this.localKey));
        this.booksincart = [];

        booksInCart.forEach(bookOrder => {
            this.bs.getSingle(bookOrder.isbn).subscribe(result => {
                result.amount = bookOrder.amount;
                this.booksincart.push(result);
                console.log(this.booksincart);
            });

        });


    }

    increaseAmount(isbn_number){

        this.local_booksincart = JSON.parse(localStorage.getItem( this.localKey));

        for(var i in this.local_booksincart){
            if(this.local_booksincart[i].isbn == isbn_number){
               this.local_booksincart[i].amount++;
            }

        }
        localStorage.setItem( this.localKey, JSON.stringify(this.local_booksincart));


    }

    decreaseAmount(isbn_number){

        this.local_booksincart = JSON.parse(localStorage.getItem( this.localKey));

        for(var i in this.local_booksincart){
            if(this.local_booksincart[i].isbn == isbn_number){
                if(this.local_booksincart[i].amount > 1)
                {
                    this.local_booksincart[i].amount--;
                }

            }

        }
        localStorage.setItem( this.localKey, JSON.stringify(this.local_booksincart));

    }

    getNettoPrice() {

        let netto_price = 0;

        for(var i in this.booksincart){

            netto_price = netto_price + (this.booksincart[i].price * this.getAmountofBook(this.booksincart[i].isbn));

        }


       return netto_price;
    }

    getBruttoPrice() {

        let steuer = this.getNettoPrice() * this.steuersatz;

        return this.getNettoPrice() + steuer;
    }

    getAmountofBook(isbn_number){

        this.local_booksincart = JSON.parse(localStorage.getItem(this.localKey));

        for(var i in this.local_booksincart){
            if(this.local_booksincart[i].isbn == isbn_number){
               return this.local_booksincart[i].amount;
            }

        }

    }


}
