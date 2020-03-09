import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { NoteService } from "src/app/services/note.service";

@Component({
  selector: "app-display-notes",
  templateUrl: "./display-notes.component.html",
  styleUrls: ["./display-notes.component.scss"]
})
export class DisplayNotesComponent implements OnInit {
  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _noteService: NoteService
  ) {}

  ngOnInit() {}
}
