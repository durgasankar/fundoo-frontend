import { Component, OnInit } from "@angular/core";
import { Note } from "src/app/models/Note";
import { NoteService } from "src/app/services/note.service";

@Component({
  selector: "app-trashed-notes",
  templateUrl: "./trashed-notes.component.html",
  styleUrls: ["./trashed-notes.component.scss"]
})
export class TrashedNotesComponent implements OnInit {
  constructor(private _noteService: NoteService) {}
  trashedNotes: Note[];
  isEmptyTrashedNotesList: boolean;

  ngOnInit() {
    this._noteService.autoRefesh.subscribe(() => {
      this.getAllTrashedNotes();
    });
    // by default it will load all remainder notes
    this.getAllTrashedNotes();
  }

  getAllTrashedNotes() {
    this._noteService.getAllTrashedNotes().subscribe(
      (response: any) => {
        console.log("response", response);
        this.trashedNotes = response.obj;
        this.isEmptyTrashedNotesList = false;
      },
      errors => {
        this.isEmptyTrashedNotesList = true;
      }
    );
  }
}
