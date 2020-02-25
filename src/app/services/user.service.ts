import { HttpClient } from "@angular/common/http";
import { RegistartionUser } from "./../models/registartion-user";
import { HttpService } from "./http.service";
import { Injectable, NgModule } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private registrationUrl: string = `${environment.USER_API_URL +
    environment.REGISTRATION_URL}`;

  constructor(private _httpService: HttpService) {}

  registration(newUser: RegistartionUser) {
    return this._httpService.postMethod(
      this.registrationUrl,
      RegistartionUser,
      this._httpService.httpOtions
    );
  }
}
