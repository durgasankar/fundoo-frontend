import { UpdateNoteComponent } from "./../update-note/update-note.component";
import { Note } from "./../../../models/Note";
import { Component, OnInit, Input } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { NoteService } from "src/app/services/note.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-simple-note",
  templateUrl: "./simple-note.component.html",
  styleUrls: ["./simple-note.component.scss"]
})
export class SimpleNoteComponent implements OnInit {
  @Input() note: Note;
  @Input() arrayOfColors;
  isPinned: boolean;
  constructor(
    private dialog: MatDialog,
    private _noteService: NoteService,
    private _matSnackBar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit() {}
  openDialog(note) {
    console.log("catched note at simple note ", note);
    const matDialogueReference = this.dialog.open(UpdateNoteComponent, {
      width: "400px",
      height: "auto",

      panelClass: "custom-dialog-container",
      data: { note }
    });
    matDialogueReference.afterClosed().subscribe(result => {
      console.log("The dialog was closed with out update");
    });
  }

  deleteForever() {
    console.log("note fetched for delete", this.note);
    this._noteService.deleteForeverNote(this.note.noteId).subscribe(
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
            duration: 4000
          });
        }
      }
    );
  }

  restoreFromTrash() {
    console.log("note fetched for restore", this.note);
    this._noteService.restoreNote(this.note.noteId).subscribe(
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
            duration: 4000
          });
        }
      }
    );
  }

  pinned() {
    console.log("note fetched for pinn operation ", this.note);
    this._noteService.pinUnpinNote(this.note.noteId).subscribe(
      response => {
        console.log("response : ", response);
        if (response.statusCode === 200) {
          console.log("response code pinned", response.message);
          this.isPinned = true;
          this._matSnackBar.open(response.message, "Ok", {
            duration: 2000
          });
        } else {
          console.log("response code unpinned", response.message);
          this.isPinned = false;
          this._matSnackBar.open(response.message, "Ok", {
            duration: 2000
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
