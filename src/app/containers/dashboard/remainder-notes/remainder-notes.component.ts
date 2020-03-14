import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { FormBuilder } from "@angular/forms";
import { NoteService } from "src/app/services/note.service";
import { Note } from "src/app/models/Note";

@Component({
  selector: "app-remainder-notes",
  templateUrl: "./remainder-notes.component.html",
  styleUrls: ["./remainder-notes.component.scss"]
})
export class RemainderNotesComponent implements OnInit {
  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _noteService: NoteService
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
        console.log("response", response);
        this.remainderNotes = response.obj;
        this.isEmptyRemainderNotesList = false;
      },
      errors => {
        this.isEmptyRemainderNotesList = true;
      }
    );
  }
}
