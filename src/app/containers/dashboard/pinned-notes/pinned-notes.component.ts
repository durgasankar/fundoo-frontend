import { Component, OnInit } from "@angular/core";
import { NoteService } from "src/app/services/note.service";
import { Note } from "src/app/models/Note";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-pinned-notes",
  templateUrl: "./pinned-notes.component.html",
  styleUrls: ["./pinned-notes.component.scss"]
})
export class PinnedNotesComponent implements OnInit {
  constructor(
    private _noteService: NoteService,
    private _router: Router,
    private _matSnackBar: MatSnackBar
  ) {}
  pinnedNotes: Note[];
  isEmptyPinnedNotesList: boolean;

  ngOnInit() {
    this._noteService.autoRefesh.subscribe(() => {
      this.getAllPinnedNotes();
    });
    // by default it will load all remainder notes
    this.getAllPinnedNotes();
  }

  getAllPinnedNotes() {
    this._noteService.getAllPinnedNotes().subscribe(
      (response: any) => {
        console.log(response);
        this.pinnedNotes = response.obj;
        if (this.pinnedNotes.length === 0) {
          this.isEmptyPinnedNotesList = true;
        } else {
          console.log("response", response);
          this.isEmptyPinnedNotesList = false;
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
