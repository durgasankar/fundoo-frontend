import { LoginUser } from "./../models/login-user";
import { UserService } from "src/app/services/user.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private userService: UserService, private roter: Router) {}

  canActivate() {
    if (this.userService.isLoggedIn()) return true;

    this.roter.navigateByUrl("/login");
    return false;
  }
}
