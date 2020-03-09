import { NoteService } from "./../../../services/note.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent implements OnInit {
  createNoteForm: FormGroup;
  card = false;
  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _noteService: NoteService
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
  createNote() {
    if (this.createNoteForm.invalid) {
      // console.log("title : ", this.createNoteForm.controls.title);
      // console.log("direct form", this.createNoteForm);
      console.log("opps! no notes are added");
      return;
    } else {
      this._noteService.createNote(this.createNoteForm.value).subscribe(
        response => {
          console.log("response : ", response);
          //   console.log("direct form inside valid : ", this.createNoteForm);
          // console.log(
          //   "title valid value : ",
          //   this.createNoteForm.controls.title.value
          // );
          this._snackBar.open(response.message + " sucessfully...", "ok", {
            duration: 4000
          });
          // reset data after creating note to default
          this.createNoteForm.reset();
        },
        errors => {
          console.log("errors : ", errors);
          if (errors.error.responseCode === 401) {
            this._snackBar.open(
              errors.error.message + " please login again",
              "Opps!",
              {
                duration: 4000
              }
            );
            localStorage.clear();
            this._router.navigateByUrl(`${environment.LOGIN_URL}`);
          } else if (errors.error.responseCode === 400) {
            this._snackBar.open(errors.error.message, "Opps!", {
              duration: 4000
            });
          } else {
            this._snackBar.open("Opps! Error creating notes", "Ok", {
              duration: 4000
            });
          }
          console.log("to reset: ", this.createNoteForm.controls.title);
          this.createNoteForm.reset();
        }
      );
    }
  }
}
