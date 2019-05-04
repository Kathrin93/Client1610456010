import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {OrderFactory} from "../shared/order-factory";
import {Book, Image, Author, Order} from '../shared/book';
import {BookStoreService} from "../shared/book-store.service";
import {BookFactory} from "../shared/book-factory";
import {Router, ActivatedRoute} from "@angular/router";
import {AuthService} from "../shared/authentication-service";


@Component({
  selector: 'bs-order-list',
  templateUrl: './order-list.component.html',
  styles: []
})
export class OrderListComponent implements OnInit {


    orders: Order[];
    books: Book[];
    cbook: Book;
    choosenState = 0;
    localKey;

    constructor(private bs: BookStoreService, private route: ActivatedRoute, private router: Router, private as:AuthService) {
    }

    ngOnInit() {


        this.bs.getAllOrders().subscribe(res => this.orders = res);
        this.bs.getAll().subscribe(res => this.books = res);

        let user_id = 0;

        if(this.as.isLoggedIn()){
            user_id = this.as.getCurrentUserId();
        }

        this.localKey = "user_" + user_id.toString() + "_cart";

    }


    getUserId(){
        return this.as.getCurrentUserId();
    }

    isAdmin(){
        return this.as.getCurrentUserFlag() == 1;
    }

    isnotAdmin(){
        console.log(this.as.getCurrentUserFlag());
        return this.as.getCurrentUserFlag() == 0;

    }

    getLink(isbn){
        return "../books/" + isbn;
    }

    isLoggedIn(){
        return this.as.isLoggedIn();
    }


    getState(stateNumber) {
        switch (stateNumber) {
            case 0:
                return "offen";
            case 1:
                return "bezahlt";
            case 2:
                return "versendet";
            case 3:
                return "storniert";
        }

    }

    getBook(cisbn) {
        this.books.forEach(book => {
            if (book.isbn == cisbn) {
                this.cbook = book;
            }

        });

        return this.cbook;
    }

    changeState(value) {
        switch (value) {
            case "Offen":
                this.choosenState = 0;
                break;
            case "Bezahlt":
                this.choosenState = 1;
                break;
            case "Versendet":
                this.choosenState = 2;
                break;
            case "Storniert":
                this.choosenState = 3;
                break;
        }

        console.log("state=" + this.choosenState);

    }


    saveState(c_order){


        console.log(this.choosenState);
        c_order.state = this.choosenState;
        console.log(c_order);


        this.bs.updateState(c_order).subscribe(res => {
            this.router.navigate(['../orders'], { relativeTo: this.route });
        });


    }
}
