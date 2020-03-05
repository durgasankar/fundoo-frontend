import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  grid: boolean = true;
  localstorage_image: any;
  imageurl: string;
  fname;
  lname;
  email;
  username;
  profilePicUser;
  url;
  ngOnInit() {}
  onClickView() {
    if (this.grid === true) {
      this.grid = false;
    } else {
      this.grid = true;
    }
  }
}
