import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { Observable, throwError } from "rxjs/index";
import { catchError, retry} from "rxjs/internal/operators";
import { Book, Image, Author, Order } from './book';

@Injectable()
export class BookStoreService {

    private api = 'http://bookstore19.s1610456010.student.kwmhgb.at/api';


    constructor(private http: HttpClient) {}

    getAll() : Observable<Array<Book>> {
        return this.http.get(`${this.api}/books`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));

    }

    getAllOrders()  : Observable<Array<Order>> {
        return this.http.get(`${this.api}/orders`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));

    }

    createOrder(order : Order) : Observable<any>{

        console.log("i should create: " + order);

        return this.http.post(`${this.api}/order`, order)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }


    getSingle(isbn: string) : Observable<Book> {
        return this.http.get(`${this.api}/book/${isbn}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getSingleOrder(id: Number) : Observable<Order> {
        return this.http.get(`${this.api}/order/${id}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    create(book : Book) : Observable<any>{

        console.log("i should create: " + book);
        return this.http.post(`${this.api}/book`, book)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    update (book : Book) : Observable<any> {
        return this.http.put(`${this.api}/book/${book.isbn}`, book)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));

    }

    updateState (order : Order) : Observable<any> {
        return this.http.put(`${this.api}/order/${order.id}`, order)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));

    }

    remove (isbn : string) : Observable<any> {
        return this.http.delete(`${this.api}/book/${isbn}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));

    }



    private errorHandler ( error:Error | any) : Observable<any> {
        return throwError(error);
    }
}
