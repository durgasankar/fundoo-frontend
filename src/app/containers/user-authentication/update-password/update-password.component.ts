import { environment } from "./../../../../environments/environment";
import { MatchPassword } from "src/app/utility/password-match";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { MatSnackBar } from "@angular/material";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-update-password",
  templateUrl: "./update-password.component.html",
  styleUrls: ["./update-password.component.scss"]
})
export class UpdatePasswordComponent implements OnInit {
  showSpinner: boolean = false;
  resetPasswordForm: FormGroup;
  token: string;

  constructor(
    private _userService: UserService,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.activatedRoute.paramMap.subscribe((parameters: ParamMap) => {
      this.token = parameters.get("token");
    });
    this.resetPasswordForm = this.formBuilder.group(
      {
        password: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10)
          ])
        ],
        confirmPassword: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10)
          ])
        ]
      },
      { validator: MatchPassword("password", "confirmPassword") }
    );
  }
  onSubmit() {
    console.log("#operation_started");
    this.showSpinner = true;
    this._userService
      .updatePassword(this.resetPasswordForm.value, this.token)
      .subscribe(
        response => {
          console.log("valid response : ", response);
          this.matSnackBar.open(response.message, "ok", { duration: 5000 });
          this.router.navigateByUrl(`${environment.LOGIN_URL}`);
          this.showSpinner = false;
        },
        errors => {
          console.log("errors response : ", errors);
          this.matSnackBar.open(errors.error.message, "ok", { duration: 5000 });
          this.router.navigateByUrl(`${environment.FORGOT_PASSWORD_URL}`);
          this.showSpinner = false;
        }
      );
  }
  get resetPasswordInfo() {
    return this.resetPasswordForm.controls;
  }
}
