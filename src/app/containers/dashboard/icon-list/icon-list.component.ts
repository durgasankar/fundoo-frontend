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
  constructor(
    private _noteService: NoteService,
    private _matSnackBar: MatSnackBar,
    private _router: Router
  ) {}
  @Input() note: Note;

  ngOnInit() {}

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
