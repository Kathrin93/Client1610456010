import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';
import { HomeComponent } from './home/home.component';
import {BookFormComponent} from "./book-form/book-form.component";
import {LoginComponent} from "./admin/login/login.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {OrderListComponent} from "./order-list/order-list.component";
import {OrderListItemComponent} from "./order-list-item/order-list-item.component";
import {CartToOrderComponent} from "./cart-to-order/cart-to-order.component";
import {AuthGuard} from "./shared/auth.guard";

const routes: Routes = [
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'books', component: BookListComponent },
    { path: 'orders', component: OrderListComponent },
    { path: 'orders/:id', component: OrderListItemComponent },
    { path: 'books/:isbn', component: BookDetailsComponent },
    { path: 'admin', component: BookFormComponent, canActivate:[AuthGuard] },
    { path: 'admin/:isbn', component: BookFormComponent},
    { path: 'login', component: LoginComponent},
    { path: 'cart', component: ShoppingCartComponent},
    { path: 'cartorder', component: CartToOrderComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }