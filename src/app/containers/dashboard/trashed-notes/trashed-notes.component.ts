import { Component, OnInit } from "@angular/core";
import { Note } from "src/app/models/Note";
import { NoteService } from "src/app/services/note.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-trashed-notes",
  templateUrl: "./trashed-notes.component.html",
  styleUrls: ["./trashed-notes.component.scss"]
})
export class TrashedNotesComponent implements OnInit {
  constructor(
    private _noteService: NoteService,
    private _router: Router,
    private _matSnackBar: MatSnackBar
  ) {}
  trashedNotes: Note[];
  isEmptyTrashedNotesList: boolean;

  ngOnInit() {
    this._noteService.autoRefesh.subscribe(() => {
      this.getAllTrashedNotes();
    });
    // by default it will load all remainder notes
    this.getAllTrashedNotes();
  }

  getAllTrashedNotes() {
    this._noteService.getAllTrashedNotes().subscribe(
      (response: any) => {
        console.log(response);
        this.trashedNotes = response.obj;
        if (this.trashedNotes.length === 0) {
          this.isEmptyTrashedNotesList = true;
        } else {
          console.log("response", response);
          this.isEmptyTrashedNotesList = false;
        }
      },
      errors => {
        console.log(errors);
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
