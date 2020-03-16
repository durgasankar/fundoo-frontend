import { Component, OnInit } from "@angular/core";
import { Note } from "src/app/models/Note";
import { NoteService } from "src/app/services/note.service";

@Component({
  selector: "app-archieved-notes",
  templateUrl: "./archieved-notes.component.html",
  styleUrls: ["./archieved-notes.component.scss"]
})
export class ArchievedNotesComponent implements OnInit {
  constructor(private _noteService: NoteService) {}
  archivedNotes: Note[];
  isEmptyArchivedNotesList: boolean;

  ngOnInit() {
    this._noteService.autoRefesh.subscribe(() => {
      this.getAllArchivedNotes();
    });
    // by default it will load all archived notes
    this.getAllArchivedNotes();
  }

  getAllArchivedNotes() {
    this._noteService.getAllArchivedNotes().subscribe(
      (response: any) => {
        this.archivedNotes = response.obj;
        if (this.archivedNotes.length === 0) {
          console.log(response);
          this.isEmptyArchivedNotesList = true;
        } else {
          console.log("response", response);
          this.isEmptyArchivedNotesList = false;
        }
      },
      errors => {
        console.log(errors);
      }
    );
  }
}
