import { LabelService } from "./../../services/label.service";
import { NoteService } from "src/app/services/note.service";
import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { refresh } from "src/app/utility/util";
import { Label } from "src/app/models/label";
import { CreateLabelComponent } from "./labels/create-label/create-label.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  showSpinner: boolean = false;
  label: Label;
  // static profile picture
  profilePicUser: any = "../assets/durgasankar.jpg";
  
  constructor(
    private _noteService: NoteService,
    private _router: Router,
    private _spinner: NgxSpinnerService,
    private _matSnackBar: MatSnackBar,
    private _labelService: LabelService
  ) {
    this._labelService.autoRefesh.subscribe(() => {
      this.displayAllLabels();
    });
  }

  //   public dialogRef: MatDialogRef<CreateLabelComponent>,
  // @Inject(MAT_DIALOG_DATA) public data: any
  labelsList: Label[];
  grid: boolean = true;
  imageurl: string;
  firstName: string = localStorage.getItem("firstName");
  ngOnInit() {
    // it will display during page load
    this.displayAllLabels();
  }
  onClickView() {
    return this.grid === true ? (this.grid = false) : (this.grid = true);
  }
  refreshButton() {
    refresh();
  }
  signOut() {
    console.log("signing out => clearing token");
    this._spinner.show();

    this._matSnackBar.open(this.firstName + " sucessfully logged out", "ok", {
      duration: 5000
    });
    this._router.navigateByUrl(`${environment.LOGIN_URL}`);
    this.showSpinner = false;
    localStorage.clear();
  }
  // displayAllNotes() {
  //   console.log("getting all notes : ");
  //   this._noteService.getAllNotes();
  // }

  displayAllLabels() {
    console.log("getting all labels : ");
    this._labelService.getAllLabelsList().subscribe(
      response => {
        console.log("response : ", response);
        this.labelsList = response.obj;
        console.log("labels list after transfering data : ", this.labelsList);
      },
      errors => {
        console.log("errors :", errors);
        if (errors.error.statusCode === 401) {
          localStorage.clear();
          this._router.navigateByUrl(`${environment.LOGIN_URL}`);
          this._matSnackBar.open(
            errors.error.message + " , login to continue.",
            "Opps!",
            {
              duration: 5000
            }
          );
        } else {
          this._matSnackBar.open(errors.error.message, "ok", {
            duration: 4000
          });
        }
      }
    );
  }
}
