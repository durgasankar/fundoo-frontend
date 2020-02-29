import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
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
  formGroup: FormGroup;
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
  }
}
