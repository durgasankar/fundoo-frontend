import { environment } from "./../../../../environments/environment";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { MatSnackBar } from "@angular/material";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-accout-activation",
  templateUrl: "./accout-activation.component.html",
  styleUrls: ["./accout-activation.component.scss"]
})
export class AccoutActivationComponent implements OnInit {
  showSpinner: boolean = false;
  formGroup: FormGroup;
  token: string;

  constructor(
    private _userService: UserService,
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
  onSubmit() {
    console.log("#operations_started");
    this.showSpinner = true;
    this.token = this.activatedRoute.snapshot.paramMap.get("token");
    this._userService.activateUser(this.formGroup, this.token).subscribe(
      response => {
        console.log("user fetched : " + response);
        this.matSnackBar.open(
          "Hallo " + response.obj + ", " + response.message,
          "ok",
          { duration: 5000 }
        );
        this.router.navigateByUrl("/login");
        this.showSpinner = false;
      },
      errors => {
        console.log("errors", errors);
        this.matSnackBar.open(errors.error.message, "cancel", {
          duration: 5000
        });
        if (errors.error.statusCode === 422) {
          this.matSnackBar.open(errors.error.message, "Opps!", {
            duration: 5000
          });
          this.router.navigateByUrl(`${environment.LOGIN_URL}`);
        } else if (errors.error.statusCode === 404) {
          this.matSnackBar.open(errors.error.message, "cancel", {
            duration: 5000
          });
          this.router.navigateByUrl(`${environment.REGISTRATION_URL}`);
        } else {
          this.matSnackBar.open(errors.error.message, "ok", {
            duration: 5000
          });
          this.router.navigateByUrl(`${environment.LOGIN_URL}`);
        }
        this.showSpinner = false;
      }
    );
  }
}

// this.showSpinner=true;
// this.token=this.route.snapshot.paramMap.get("token");
// this.userservice.activateUser(this.activeForm,this.token).subscribe((user) => {
//   this.route2.navigate(['/login']);
//   this.matSnackBar.open('Your Account Verified SuccessFully','ok',{duration:4000});
//   this.showSpinner=false;
// },
//   (error: any) => {
//     this.showSpinner=false;
//     this.matSnackBar.open('Bad Creaditial','ok',{duration:4000});
//     console.log(error)
//   });
// // alert(this.user.firstName + ' ' + this.user.email + ' ' + this.user.password);
