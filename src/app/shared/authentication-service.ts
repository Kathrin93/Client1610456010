import { Injectable } from "@angular/core";
import { isNullOrUndefined } from "util";
import { HttpClient } from "@angular/common/http";
import * as decode from 'jwt-decode';
import { retry } from "rxjs/internal/operators";

//npm install --save-dev jwt-decode

interface User {
    result: {
        created_at: Date,
        email: string,
        id: number,
        name: string,
        flag: number,
        firstName: string,
        lastName: string,
        address: string,
        updated_at: Date
    }
}

@Injectable()
export class AuthService {

    private api:string = 'http://bookstore19.s1610456010.student.kwmhgb.at/api/auth';

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string ) {
        return this.http.post(`${this.api}/login`, {'email': email, 'password': password});
    }

    public setCurrentUserId(){
        this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res =>{
            console.log("userFlage:" +  res.result.flag.toString() );
                localStorage.setItem('userId', res.result.id.toString());
                localStorage.setItem('userFlag', res.result.flag.toString());
                localStorage.setItem('userFirstName', res.result.firstName);
                localStorage.setItem('userLastName', res.result.lastName);
                localStorage.setItem('address', res.result.address);

            }
        );
    }

    public getCurrentUserId(){
        return Number.parseInt(localStorage.getItem('userId'));
    }

    public getCurrentUserFlag(){
        return Number.parseInt(localStorage.getItem('userFlag'));
    }

    public getCurrentAddress(){
        return localStorage.getItem('address');
    }

    public getCurrentFullUserName(){
        return localStorage.getItem('userFirstName') + " " + localStorage.getItem('userLastName');
    }

    public setLocalStorage(token: string) {
        console.log("Storing token");
        console.log(token);
        const decodedToken = decode(token);
        console.log(decodedToken);
        console.log(decodedToken.user.id)
        console.log("Address:");
        console.log(decodedToken.user.address);

        let currentCart = localStorage.getItem('user_default_cart');
        let localKey = "user_" + decodedToken.user.id.toString() + "_cart";
        localStorage.setItem(localKey, currentCart);
        localStorage.removeItem('user_default_cart');

        localStorage.setItem('token', token);
        localStorage.setItem('userId', decodedToken.user.id);
        localStorage.setItem('userFlag', decodedToken.user.flag);
        localStorage.setItem('userFirstName', decodedToken.user.firstName);
        localStorage.setItem('userLastName', decodedToken.user.lastName);
        localStorage.setItem('address', decodedToken.user.address);
    }

    public logout() {
        this.http.post(`${this.api}/logout`, {});
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        console.log("logged out");
    }

    public isLoggedIn() {
        return !isNullOrUndefined(localStorage.getItem("token"));
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

}