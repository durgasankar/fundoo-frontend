import { HttpClient } from "@angular/common/http";
import { RegistartionUser } from "./../models/registartion-user";
import { HttpService } from "./http.service";
import { Injectable, NgModule } from "@angular/core";
import { environment } from "src/environments/environment";
import { LoginUser } from "../models/login-user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private registrationUrl: string = `${environment.USER_API_URL +
    environment.REGISTRATION_URL}`;

  private loginUrl: string = `${environment.USER_API_URL +
    environment.LOGIN_URL}`;

  constructor(private _httpService: HttpService) {}

  public registration(registrationDto: RegistartionUser) {
    console.log("fetching regd url : ", this.registrationUrl);
    return this._httpService.postMethod(
      this.registrationUrl,
      registrationDto,
      this._httpService.httpOtions
    );
  }
  public login(loginDto: LoginUser) {
    console.log("fetching loginUrl : ", this.loginUrl);
    return this._httpService.postMethod(
      this.loginUrl,
      loginDto,
      this._httpService.httpOtions
    );
  }
}
