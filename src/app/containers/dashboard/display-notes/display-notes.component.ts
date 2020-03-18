import { Note } from "./../../../models/Note";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { NoteService } from "src/app/services/note.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-display-notes",
  templateUrl: "./display-notes.component.html",
  styleUrls: ["./display-notes.component.scss"]
})
export class DisplayNotesComponent implements OnInit {
  constructor(
    private _router: Router,
    private _matSnackBar: MatSnackBar,
    private _noteService: NoteService
  ) {}
  expand: any = false;
  notes: Note[];
  isEmptyNotesList: boolean;

  ngOnInit() {
    this._noteService.autoRefesh.subscribe(() => {
      this.getAllNotes();
    });
    // bedefault it will load data
    this.getAllNotes();
  }

  getAllNotes() {
    this._noteService.getAllNotes().subscribe(
      (response: any) => {
        console.log("response", response);
        this.notes = response.obj;
        if (this.notes.length === 0) {
          this.isEmptyNotesList = true;
        } else {
          this.isEmptyNotesList = false;
        }
      },
      errors => {
        console.log("empty list : ", errors);
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
          this._matSnackBar.open(
            errors.error.message + " , please refresh",
            "Opps!",
            {
              duration: 4000
            }
          );
        }
      }
    );
  }
}
