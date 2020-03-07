import { RegistartionUser } from "./../models/registartion-user";
import { HttpService } from "./http.service";
import { Injectable, NgModule } from "@angular/core";
import { environment } from "src/environments/environment";
import { LoginUser } from "../models/login-user";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private registrationUrl: string = `${environment.USER_API_URL +
    environment.REGISTRATION_URL}`;

  private loginUrl: string = `${environment.USER_API_URL +
    environment.LOGIN_URL}`;

  private verificationUrl: string = `${environment.USER_API_URL +
    environment.ACTIVATE_ACCOUNT_URL}`;

  private forgotPasswordUrl: string = `${environment.USER_API_URL +
    environment.FORGOT_PASSWORD_URL}`;

  private updatePasswordUrl: string = `${environment.USER_API_URL +
    environment.UPDATE_PASSWORD_URL}`;

  constructor(private _httpService: HttpService) {}

  private httpOptions = {
    headers: new HttpHeaders({
      "content-type": "application/json"
    })
  };

  public registration(registrationDto: RegistartionUser) {
    console.log("fetching regd url : ", this.registrationUrl);
    return this._httpService.postMethod(
      this.registrationUrl,
      registrationDto,
      this.httpOptions
    );
  }
  public login(loginDto: LoginUser) {
    console.log("fetching loginUrl : ", this.loginUrl);
    return this._httpService.postMethod(
      this.loginUrl,
      loginDto,
      this.httpOptions
    );
  }

  public activateUser(user: any, token: string): Observable<any> {
    return this._httpService.putMethod(
      `${this.verificationUrl}/${token}`,
      user,
      this.httpOptions
    );
  }

  public forgotPassword(emailDto: any): Observable<any> {
    console.log("fetching forgot password url : ", this.forgotPasswordUrl);
    return this._httpService.postMethod(
      this.forgotPasswordUrl,
      emailDto,
      this.httpOptions
    );
  }
  public updatePassword(updatePassword: any, token: string): Observable<any> {
    return this._httpService.putMethod(
      `${this.updatePasswordUrl}/${token}`,
      updatePassword,
      this.httpOptions
    );
  }
}
