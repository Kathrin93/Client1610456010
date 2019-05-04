import { Component, OnInit, Input } from '@angular/core';
import {Order} from "../shared/order";
import {ActivatedRoute, Router} from "@angular/router";
import { BookStoreService } from "../shared/book-store.service";
import {AuthService} from "../shared/authentication-service";

@Component({
  selector: 'bs-order-list-item',
  templateUrl: './order-list-item.component.html',
  styles: []
})
export class OrderListItemComponent implements OnInit {

  @Input() order: Order;

  constructor(private bs: BookStoreService, private router: Router, private route: ActivatedRoute, private as : AuthService) { }

    choosenState = 0;

  ngOnInit() {

      const params = this.route.snapshot.params;
      this.bs.getSingleOrder(params['id']).subscribe(
          datafromObservable =>this.order = datafromObservable
      );
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


    saveState(c_order, givenComment){


        console.log(this.choosenState);
        c_order.state = this.choosenState;
        c_order.comment = givenComment;
        c_order.public_comment = givenComment;
        console.log(c_order);



        this.bs.updateState(c_order).subscribe(res => {
            let url = '../' + c_order.id;
            this.router.navigate([url], { relativeTo: this.route });
            location.reload();
        });




    }

    isAdmin(){
        return this.as.getCurrentUserFlag() == 1;
    }

    isnotAdmin(){
        console.log(this.as.getCurrentUserFlag());
        return this.as.getCurrentUserFlag() == 0;

    }

    getLink(isbn){
        return "../../books/" + isbn;
    }



}
