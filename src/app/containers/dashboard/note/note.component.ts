import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent implements OnInit {
  createNoteForm: FormGroup;
  card = false;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.createNoteForm = this._formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required]
    });
  }
  cardSwap() {
    console.log(this.card);
    return this.card === true ? (this.card = false) : (this.card = true);
  }
  createNote() {}
}
