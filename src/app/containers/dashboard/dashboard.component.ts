import { NoteService } from "src/app/services/note.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from "@angular/material";
import { refresh } from "src/app/utility/util";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  showSpinner: boolean = false;
  // static profile picture
  profilePicUser: any = "../assets/durgasankar.jpg";
  constructor(
    private _noteService: NoteService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private matSnackBar: MatSnackBar
  ) {}
  grid: boolean = true;
  imageurl: string;
  firstName: string = localStorage.getItem("firstName");
  ngOnInit() {}
  onClickView() {
    return this.grid === true ? (this.grid = false) : (this.grid = true);
  }
  refreshButton() {
    refresh();
  }
  signOut() {
    console.log("signing out => clearing token");
    this.spinner.show();

    this.matSnackBar.open(this.firstName + " sucessfully logged out", "ok", {
      duration: 5000
    });
    this.router.navigateByUrl(`${environment.LOGIN_URL}`);
    this.showSpinner = false;
    localStorage.clear();
  }
  displayAllNotes() {
    console.log("getting all notes : ");
    this._noteService.getAllNotes();
  }
}
