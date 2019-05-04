import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from "./authentication-service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService:AuthService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.authService.isLoggedIn();
    }
}