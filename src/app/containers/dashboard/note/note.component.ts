import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent implements OnInit {
  card = false;
  constructor(private router: Router, private snackBar: MatSnackBar) {}
  ngOnInit() {}
  cardSwap() {
    console.log(this.card);
    return this.card === true ? (this.card = false) : (this.card = true);
  }
}
