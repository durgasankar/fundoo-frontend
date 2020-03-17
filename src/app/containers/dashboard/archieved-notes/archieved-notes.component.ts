import { Component, OnInit } from "@angular/core";
import { Note } from "src/app/models/Note";
import { NoteService } from "src/app/services/note.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-archieved-notes",
  templateUrl: "./archieved-notes.component.html",
  styleUrls: ["./archieved-notes.component.scss"]
})
export class ArchievedNotesComponent implements OnInit {
  constructor(
    private _noteService: NoteService,
    private _router: Router,
    private _matSnackBar: MatSnackBar
  ) {}
  archivedNotes: Note[];
  isEmptyArchivedNotesList: boolean;

  ngOnInit() {
    this._noteService.autoRefesh.subscribe(() => {
      this.getAllArchivedNotes();
    });
    // by default it will load all archived notes
    this.getAllArchivedNotes();
  }

  getAllArchivedNotes() {
    this._noteService.getAllArchivedNotes().subscribe(
      (response: any) => {
        console.log(response);
        this.archivedNotes = response.obj;
        if (this.archivedNotes.length === 0) {
          this.isEmptyArchivedNotesList = true;
        } else {
          console.log("response", response);
          this.isEmptyArchivedNotesList = false;
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
