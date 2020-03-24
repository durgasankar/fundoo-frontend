import { AddLabelComponent } from "./../labels/add-label/add-label.component";
import { Color } from "./../../../models/color";
import { Router } from "@angular/router";
import { MatSnackBar, MatDialog } from "@angular/material";
import { NoteService } from "src/app/services/note.service";
import { Component, OnInit, Input } from "@angular/core";
import { Note } from "src/app/models/Note";
import { environment } from "src/environments/environment";
import { AmazingTimePickerService } from "amazing-time-picker";

@Component({
  selector: "app-icon-list",
  templateUrl: "./icon-list.component.html",
  styleUrls: ["./icon-list.component.scss"]
})
export class IconListComponent implements OnInit {
  colorsList = [
    [
      { colorCode: "rgba(255,255,255,1)", name: "white" },
      { colorCode: "rgba(231, 116, 113,1)", name: "Red" },
      { colorCode: "rgba(249, 150, 107,1)", name: "Orange" },
      { colorCode: "rgba(233, 171, 23,1)", name: "Yellow" }
    ],
    [
      { colorCode: "rgba(137, 195, 92,1)", name: "Green" },
      { colorCode: "rgba(132, 139, 121,1)", name: "Teal" },
      { colorCode: "rgba(198, 222, 255,1)", name: "Blue" },
      { colorCode: "rgba( 114, 143, 206,1)", name: "Dark blue" }
    ],
    [
      { colorCode: "rgba( 158, 123, 255,1)", name: "Purple" },
      { colorCode: "rgba(230, 169, 236,1)", name: "Pink" },
      { colorCode: "rgba(194, 178, 128,1)", name: "Brown" },
      { colorCode: "rgba(229, 228, 226,1)", name: "Gray" }
    ]
  ];
  constructor(
    private _noteService: NoteService,
    private _matSnackBar: MatSnackBar,
    private _router: Router,
    private _amazingTimePicker: AmazingTimePickerService,
    private _matDialog: MatDialog
  ) {}
  @Input() note: Note;

  ngOnInit() {}
  selectedTime: string;
  today: any;

  openTimePicker(noteId) {
    // pop up for setting alarm
    console.log("fetched note id for remainder : ", noteId);
    const amazingTimePicker = this._amazingTimePicker.open({
      time: this.selectedTime,
      theme: "dark",
      arrowStyle: {
        background: "red",
        color: "white"
      }
    });
    // after choosing time from clock
    amazingTimePicker.afterClose().subscribe(time => {
      // storing the selected time in a variable with some string concatination
      this.selectedTime = time + ":00 hours";
      console.log("time selected : ", this.selectedTime);
      // after getting data from clock call for remainder operation
      this._noteService.addRemainderToNote(noteId, this.selectedTime).subscribe(
        response => {
          console.log("response : ", response);
          this._matSnackBar.open(response.message, "ok", {
            duration: 4000
          });
        },
        errors => {
          console.log("errors", errors);
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
          } else if (errors.error.statusCode === 502) {
            console.log(
              "alarm already set for that time : ",
              this.selectedTime
            );
            this._matSnackBar.open(errors.error.message, "Opps!", {
              duration: 5000
            });
          } else {
            this._matSnackBar.open(errors.error.message, "ok", {
              duration: 5000
            });
          }
        }
      );
    });
  }

  changeColor(color) {
    console.log("fetched color object : ", color);
    // transfering color information to a variable
    this._noteService.noteColor = color;
    console.log("note color from variable : ", this._noteService.noteColor);

    this._noteService
      .changeColorOfNote(
        this.note.noteId,
        this._noteService.noteColor.colorCode
      )
      .subscribe(
        response => {
          console.log("response : ", response);
          this._matSnackBar.open(response.message + " sucessfully", "ok", {
            duration: 4000
          });
        },
        errors => {
          console.log("errors : ", errors);
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
            this._matSnackBar.open(errors.error.message, "ok", {
              duration: 5000
            });
          }
        }
      );
  }

  deleteNote() {
    console.log("note fetched for delete", this.note);
    this._noteService.deleteNote(this.note.noteId).subscribe(
      response => {
        console.log("response : ", response);
        this._matSnackBar.open(response.message + " sucessfully", "ok", {
          duration: 4000
        });
      },
      errors => {
        console.log("errors : ", errors);
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
          this._matSnackBar.open(errors.error.message, "ok", {
            duration: 5000
          });
        }
      }
    );
  }
  archive() {
    console.log("note fetched for archive", this.note);
    this._noteService.archiveNote(this.note.noteId).subscribe(
      response => {
        console.log("response : ", response);
        // archive
        if (response.statusCode === 200) {
          this._matSnackBar.open(response.message + " sucessfully", "ok", {
            duration: 4000
          });
          // urarchive
        } else {
          this._matSnackBar.open(response.message + " sucessfully", "ok", {
            duration: 4000
          });
        }
      },
      errors => {
        console.log("errors : ", errors);
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
          this._matSnackBar.open(errors.error.message, "ok", {
            duration: 4000
          });
        }
      }
    );
  }

  addLabelToNoteDialog(note) {
    console.log(
      "fetched Note on add label Click sending the data to add label component : ",
      note
    );
    const dialogReference = this._matDialog.open(AddLabelComponent, {
      width: "280px",
      height: "auto",
      data: { note }
    });
    dialogReference.afterClosed().subscribe(result => {
      console.log("dialog closed with out any change");
    });
  }
}
