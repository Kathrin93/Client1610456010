import {Component, OnInit, Input} from '@angular/core';
import {OrderFactory} from "../shared/order-factory";
import {Book, Image, Author, Order} from '../shared/book';
import {BookStoreService} from "../shared/book-store.service";
import {BookFactory} from "../shared/book-factory";
import {Router, ActivatedRoute} from "@angular/router";
import {AuthService} from "../shared/authentication-service";

@Component({
    selector: 'bs-cart-to-order',
    templateUrl: './cart-to-order.component.html',
    styles: []
})
export class CartToOrderComponent  implements OnInit {

    order = OrderFactory.empty();
    netto_price = 0;
    steuersatz = 0.1;

    books: Book[];
    booksincart = [];
    local_booksincart = [];
    localKey;


    constructor(private bs : BookStoreService, private route: ActivatedRoute, private router: Router, private as : AuthService) {}

    //automatisch aufgerufen wenn Komponente geladen wird
    ngOnInit() {


        let user_id = 0;

        if(this.as.isLoggedIn()){
            user_id = this.as.getCurrentUserId();
        }

        this.localKey = "user_" + user_id.toString() + "_cart";



        const booksInCart = JSON.parse(localStorage.getItem(this.localKey));

        booksInCart.forEach(bookOrder => {
            this.bs.getSingle(bookOrder.isbn).subscribe(result => {
                result.amount = bookOrder.amount;
                this.booksincart.push(result);

            });

        });

        console.log(this.booksincart);



    }

    getAddress() {
       return this.as.getCurrentAddress();
    }


    createOrder()
    {


        const new_order: Order = OrderFactory.empty();

        new_order.netto = this.getNettoPrice();
        new_order.brutto = this.getBruttoPrice();
        new_order.state = 0;
        new_order.books = this.booksincart;
        new_order.user_id = this.as.getCurrentUserId();

        console.log(new_order);


        this.bs.createOrder(new_order).subscribe(res => {
            this.order = OrderFactory.empty();
            this.router.navigate(['../orders'], {relativeTo: this.route});
            localStorage.removeItem(this.localKey);
        });


    }

    getNettoPrice()
    {

        let netto_price = 0;

        for (var i in this.booksincart) {

            netto_price = netto_price + (this.booksincart[i].price * this.getAmountofBook(this.booksincart[i].isbn));

        }


        return netto_price;
    }

    getBruttoPrice()
    {

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
