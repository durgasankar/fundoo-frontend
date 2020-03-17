import { Component, OnInit } from "@angular/core";
import { NoteService } from "src/app/services/note.service";
import { Note } from "src/app/models/Note";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-remainder-notes",
  templateUrl: "./remainder-notes.component.html",
  styleUrls: ["./remainder-notes.component.scss"]
})
export class RemainderNotesComponent implements OnInit {
  constructor(
    private _noteService: NoteService,
    private _router: Router,
    private _matSnackBar: MatSnackBar
  ) {}
  remainderNotes: Note[];
  isEmptyRemainderNotesList: boolean;

  ngOnInit() {
    this._noteService.autoRefesh.subscribe(() => {
      this.getAllRemainderNotes();
    });
    // by default it will load all remainder notes
    this.getAllRemainderNotes();
  }

  getAllRemainderNotes() {
    this._noteService.getAllRemainderNotes().subscribe(
      (response: any) => {
        console.log(response);
        this.remainderNotes = response.obj;
        if (this.remainderNotes.length === 0) {
          this.isEmptyRemainderNotesList = true;
        } else {
          console.log("response", response);
          this.isEmptyRemainderNotesList = false;
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
