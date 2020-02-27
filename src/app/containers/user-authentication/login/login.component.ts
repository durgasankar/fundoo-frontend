import { UserService } from "src/app/services/user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginUser } from "./../../../models/login-user";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginDto: LoginUser = new LoginUser();
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailId: [
        null,
        Validators.compose([
          Validators.compose([Validators.required, Validators.email])
        ])
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10)
        ])
      ]
    });
  }
}
