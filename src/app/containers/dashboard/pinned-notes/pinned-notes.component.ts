import { Component, OnInit } from "@angular/core";
import { NoteService } from "src/app/services/note.service";
import { Note } from "src/app/models/Note";

@Component({
  selector: "app-pinned-notes",
  templateUrl: "./pinned-notes.component.html",
  styleUrls: ["./pinned-notes.component.scss"]
})
export class PinnedNotesComponent implements OnInit {
  constructor(private _noteService: NoteService) {}
  pinnedNotes: Note[];
  isEmptyPinnedNotesList: boolean;

  ngOnInit() {
    this._noteService.autoRefesh.subscribe(() => {
      this.getAllPinnedNotes();
    });
    // by default it will load all remainder notes
    this.getAllPinnedNotes();
  }

  getAllPinnedNotes() {
    this._noteService.getAllPinnedNotes().subscribe(
      (response: any) => {
        console.log("response", response);
        this.pinnedNotes = response.obj;
        this.isEmptyPinnedNotesList = false;
      },
      (errors: any) => {
        this.isEmptyPinnedNotesList = true;
        console.log("no notes available");
      }
    );
  }
}
