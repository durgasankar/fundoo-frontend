import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { UserService } from "./../../../services/user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  fetchedEmailId: string;
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matSnackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      emailId: [null, [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    console.log("#operation_started");
    console.log("fetched form value : ", this.forgotPasswordForm.value);
    this._userService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      response => {
        console.log("subcription response : ", response.message);
      },
      errors => {
        console.log("inside errors : ", errors);
      }
    );
  }
}
