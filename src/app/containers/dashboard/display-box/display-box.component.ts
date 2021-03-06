import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { NoteService } from "src/app/services/note.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-display-box",
  templateUrl: "./display-box.component.html",
  styleUrls: ["./display-box.component.scss"]
})
export class DisplayBoxComponent implements OnInit {
  createNoteForm: FormGroup;
  card: boolean = false;
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
      console.log("Opps! no notes are added...");
      return;
    } else {
      this._noteService.createNote(this.createNoteForm.value).subscribe(
        response => {
          console.log("response : ", response);
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
