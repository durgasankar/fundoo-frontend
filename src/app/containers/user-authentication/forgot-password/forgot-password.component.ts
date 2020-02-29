import { environment } from "src/environments/environment";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { UserService } from "./../../../services/user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  fetchedEmailId: string;
  showSpinner: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.forgotPasswordForm = this.formBuilder.group({
      emailId: [null, [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return this.router.navigateByUrl(`${environment.FORGOT_PASSWORD_URL}`);
    }
    this.showSpinner = true;
    console.log("#operation_started");
    console.log("fetched form value : ", this.forgotPasswordForm.value);
    this._userService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      response => {
        console.log("subcription response : ", response.message);
        this.matSnackBar.open(response.message, "cancel", { duration: 5000 });
        this.router.navigateByUrl("/");
        this.showSpinner = false;
      },
      errors => {
        console.log("inside errors : ", errors);
        if (errors.error.statusCode === 401) {
          this.matSnackBar.open(errors.error.message, "ok", { duration: 5000 });
          this.router.navigateByUrl("/");
        } else {
          this.matSnackBar.open(
            errors.error.message + ", Please register",
            "ok",
            { duration: 5000 }
          );
          this.router.navigateByUrl(`${environment.REGISTRATION_URL}`);
        }
        this.showSpinner = false;
      }
    );
  }
}
