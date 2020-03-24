import { Note } from "src/app/models/Note";
import { NoteService } from "src/app/services/note.service";
import { LabelService } from "src/app/services/label.service";
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from "@angular/material";
import { Component, OnInit, Inject, Input } from "@angular/core";
import { Label } from "src/app/models/label";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-add-label",
  templateUrl: "./add-label.component.html",
  styleUrls: ["./add-label.component.scss"]
})
export class AddLabelComponent implements OnInit {
  fetchedNote: Note;
  label: Label;
  labelsList: Label[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _labelService: LabelService,
    private dialogRef: MatDialogRef<AddLabelComponent>,
    private _noteService: NoteService,
    private _matSnackBar: MatSnackBar
  ) {
    // saving the fetched data to a variable
    this.fetchedNote = this.data.note;
    this._labelService.autoRefesh.subscribe(() => {
      this.displayAllLabels();
    });
  }

  ngOnInit() {
    //  it will display during page load
    this.displayAllLabels();
  }

  displayAllLabels() {
    this._labelService.getAllLabelsList().subscribe(response => {
      console.log("response : ", response);
      // transfering all data of response to a listArray variable
      this.labelsList = response.obj;
      console.log("labels list after transfering data : ", this.labelsList);
    });
  }
  done() {
    console.log("dialog ref is closed .");
    this.dialogRef.close();
  }

  addNoteToLabel(label) {
    console.log("fetched lebel : ", label);
    console.log("fetched note : ", this.fetchedNote);
  }
}
