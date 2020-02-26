import { RegistartionUser } from "src/app/models/registartion-user";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatchPassword } from "src/app/utility/password-match";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
  showSpinner: boolean = false;
  user: RegistartionUser = new RegistartionUser();
  registrationForm: FormGroup;
  submitted: boolean = false;
  hide = true;
  hide2 = true;
  showMsg: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private userservice: UserService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit() {
    this.spinner.show();
    this.registrationForm = this.formBuilder.group(
      {
        firstName: [
          null,
          [Validators.required, Validators.pattern("^[a-zA-Z]{3,15}$")]
        ],
        lastName: [
          null,
          [Validators.required, Validators.pattern("^[a-zA-Z]{3,15}$")]
        ],
        emailId: [
          null,
          Validators.compose([
            Validators.compose([Validators.required, Validators.email])
          ])
        ],
        mobileNumber: [
          null,
          Validators.compose([
            Validators.required,
            Validators.pattern("^[0-9]{10}$")
          ])
        ],
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
  get userInfo() {
    return this.registrationForm.controls;
  }
  onSubmit() {
    this.showSpinner = true;
    if (this.registrationForm.invalid) {
      return this.router.navigateByUrl("/registration");
    }

    console.log("value : ", this.registrationForm.value);
    this.userservice.registration(this.registrationForm.value).subscribe(
      response => {
        console.log(response.message);
        this.matSnackBar.open(response.message, "ok", { duration: 4000 });
        this.router.navigateByUrl("/login");
      },
      error => {
        console.log("error", "registration error");
        this.matSnackBar.open(error.message, "ok", { duration: 4000 });
      }
    );
  }
}
