import { UpdateNoteComponent } from "./../update-note/update-note.component";
import { Note } from "./../../../models/Note";
import { Component, OnInit, Input } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";

@Component({
  selector: "app-simple-note",
  templateUrl: "./simple-note.component.html",
  styleUrls: ["./simple-note.component.scss"]
})
export class SimpleNoteComponent implements OnInit {
  @Input() note: Note;
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}
  openDialog(note) {
    console.log("catched note at simple note ", note);
    const matDialogueReference = this.dialog.open(UpdateNoteComponent, {
      width: "400px",
      height: "auto",
      panelClass: "custom-dialog-container",
      data: { note }
    });
    matDialogueReference.afterClosed().subscribe(result => {
      console.log("The dialog was closed with out update");
    });
  }
}
