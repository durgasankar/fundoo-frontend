import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { NoteService } from "src/app/services/note.service";
import { Component, OnInit, Input } from "@angular/core";
import { Note } from "src/app/models/Note";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-icon-list",
  templateUrl: "./icon-list.component.html",
  styleUrls: ["./icon-list.component.scss"]
})
export class IconListComponent implements OnInit {
  arrayOfColors = [
    [
      { color: "rgba(255,255,255,1)", name: "white" },
      { color: "rgba(231, 116, 113,1)", name: "Red" },
      { color: "rgba(249, 150, 107,1)", name: "Orange" },
      { color: "rgba(233, 171, 23,1)", name: "Yellow" }
    ],
    [
      { color: "rgba(137, 195, 92,1)", name: "Green" },
      { color: "rgba(132, 139, 121,1)", name: "Teal" },
      { color: "rgba(198, 222, 255,1)", name: "Blue" },
      { color: "rgba( 114, 143, 206,1)", name: "Dark blue" }
    ],
    [
      { color: "rgba( 158, 123, 255,1)", name: "Purple" },
      { color: "rgba(230, 169, 236,1)", name: "Pink" },
      { color: "rgba(194, 178, 128,1)", name: "Brown" },
      { color: "rgba(229, 228, 226,1)", name: "Gray" }
    ]
  ];
  constructor(
    private _noteService: NoteService,
    private _matSnackBar: MatSnackBar,
    private _router: Router
  ) {}
  @Input() note: Note;

  ngOnInit() {}

  changeColor(color) {
    console.log("color --> ", color, this.note.noteId);
    this._noteService.changeColorOfNote(this.note.noteId, color).subscribe(
      response => {
        console.log("response : ", response);
        this._matSnackBar.open(response.message + " sucessfully", "ok", {
          duration: 4000
        });
      },
      errors => {
        console.log("errors : ", errors);
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
            duration: 5000
          });
        }
      }
    );
  }

  deleteNote() {
    console.log("note fetched for delete", this.note);
    this._noteService.deleteNote(this.note.noteId).subscribe(
      response => {
        console.log("response : ", response);
        this._matSnackBar.open(response.message + " sucessfully", "ok", {
          duration: 4000
        });
      },
      errors => {
        console.log("errors : ", errors);
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
            duration: 5000
          });
        }
      }
    );
  }
  archive() {
    console.log("note fetched for archive", this.note);
    this._noteService.archiveNote(this.note.noteId).subscribe(
      response => {
        console.log("response : ", response);
        // archive
        if (response.statusCode === 200) {
          this._matSnackBar.open(response.message + " sucessfully", "ok", {
            duration: 4000
          });
          // urarchive
        } else {
          this._matSnackBar.open(response.message + " sucessfully", "ok", {
            duration: 4000
          });
        }
      },
      errors => {
        console.log("errors : ", errors);
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
