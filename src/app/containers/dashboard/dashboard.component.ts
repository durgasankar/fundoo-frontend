import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  showSpinner: boolean = false;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private matSnackBar: MatSnackBar
  ) {}
  grid: boolean = true;
  localstorage_image: any;
  imageurl: string;
  ngOnInit() {}
  onClickView() {
    return this.grid === true ? (this.grid = false) : (this.grid = true);
  }
  refresh() {
    console.log("reloading page");
    window.location.reload();
  }
  signOut() {
    console.log("signing out => clearing token");
    this.spinner.show();

    this.matSnackBar.open(
      localStorage.getItem("firstName") + " sucessfully logged out",
      "ok",
      {
        duration: 5000
      }
    );
    this.router.navigateByUrl(`${environment.LOGIN_URL}`);
    this.showSpinner = false;
    localStorage.clear();
  }
}
