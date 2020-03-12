import { Note } from "./../../../models/Note";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-simple-note",
  templateUrl: "./simple-note.component.html",
  styleUrls: ["./simple-note.component.scss"]
})
export class SimpleNoteComponent implements OnInit {
  constructor() {}
  @Input() note: Note;
  ngOnInit() {}
}
