import { environment } from "src/environments/environment";
import { UserService } from "src/app/services/user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginUser } from "./../../../models/login-user";
import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showSpinner: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
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

  onSubmit() {
    this.showSpinner = true;
    if (this.loginForm.invalid) {
      return this.router.navigateByUrl(`${environment.LOGIN_URL}`);
    }
    console.log("login value", this.loginForm.value);
    this._userService.login(this.loginForm.value).subscribe(
      response => {
        console.log("response message : ", response);
        this.matSnackBar.open(response.message, "cancel", { duration: 5000 });
        localStorage.setItem("token", response.token);
        this.showSpinner = false;
        this.router.navigateByUrl("/dashboard");
      },
      errors => {
        console.log("error : ", errors);
        if (errors.error.statusCode === 401) {
          console.log("bad credentials : ", errors.error);
          this.matSnackBar.open(errors.error.message, "cancel", {
            duration: 5000
          });
          this.router.navigateByUrl("/login");
          this.showSpinner = false;
        } else if (errors.error.statusCode === 400) {
          console.log("not found user : ", errors.error.message);
          this.matSnackBar.open(errors.error.message, "Opps!", {
            duration: 5000
          });
          this.router.navigateByUrl(`${environment.REGISTRATION_URL}`);
          this.showSpinner = false;
        } else {
          console.log("un authenticated : ", errors.error);
          this.matSnackBar.open(errors.error.message, "ok", {
            duration: 5000
          });
          this.router.navigateByUrl(`${environment.LOGIN_URL}`);
          this.showSpinner = false;
        }
      }
    );
  }
}
