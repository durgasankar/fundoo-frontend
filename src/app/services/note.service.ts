import { Note } from "./../models/Note";
import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpHeaders } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { Color } from "../models/color";

@Injectable({
  providedIn: "root"
})
export class NoteService {
  public noteColor: Color;
  private createNoteUrl: string = `${environment.NOTE_API_URL +
    environment.CREATE_NOTE_URL}`;

  private getAllNotesUrl: string = `${environment.NOTE_API_URL +
    environment.GET_ALL_NOTES_URL}`;

  private getAllRemainderNotesUrl: string = `${environment.NOTE_API_URL +
    environment.GET_ALL_REMAINDER_NOTES_URL}`;

  private getAllArchivedNotesUrl: string = `${environment.NOTE_API_URL +
    environment.GET_ALL_ARCHIVED_NOTES_URL}`;

  private getAllTrashedNotesUrl: string = `${environment.NOTE_API_URL +
    environment.GET_ALL_TRASHED_NOTES_URL}`;

  private getAllPinnedNotesUrl: string = `${environment.NOTE_API_URL +
    environment.GET_ALL_PINNED_NOTES_URL}`;

  constructor(private _httpService: HttpService) {}

  private _notesList = new Subject<any>();
  private _subject = new Subject<any>();
  private _content = new BehaviorSubject<number>(0);
  public share = this._content.asObservable();

  public get autoRefesh() {
    return this._subject;
  }

  // fetching token from local storage stored during login
  private httpOptions = {
    headers: new HttpHeaders({
      "content-type": "application/json",
      token: localStorage.getItem("token")
    })
  };

  public createNote(note: Note) {
    console.log(
      "fetching token from header : ",
      this.httpOptions,
      "note : ",
      note
    );
    return this._httpService
      .postMethod(this.createNoteUrl, note, this.httpOptions)
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }
  // get all notes
  public getAllNotes() {
    console.log(" all notes service reached");

    return this._httpService.getMethod(this.getAllNotesUrl, this.httpOptions);
  }

  public getAllRemainderNotes() {
    console.log("remainder service reached");

    return this._httpService.getMethod(
      this.getAllRemainderNotesUrl,
      this.httpOptions
    );
  }
  public getAllArchivedNotes() {
    console.log("archived Service Reached");
    return this._httpService.getMethod(
      this.getAllArchivedNotesUrl,
      this.httpOptions
    );
  }

  public getAllTrashedNotes() {
    console.log("archived Service Reached");
    return this._httpService.getMethod(
      this.getAllTrashedNotesUrl,
      this.httpOptions
    );
  }

  public getAllPinnedNotes() {
    console.log("archived Service Reached");
    return this._httpService.getMethod(
      this.getAllPinnedNotesUrl,
      this.httpOptions
    );
  }

  public updateNote(note: Note, noteId: number) {
    console.log(
      "fetching token from header : ",
      this.httpOptions,
      "note for updation : ",
      note
    );
    return this._httpService
      .putMethod(
        `${environment.NOTE_API_URL + environment.UPDATE_NOTE_URL}${noteId}`,
        note,
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }
  public deleteNote(noteId: number) {
    console.log("service reached with id : " + noteId);
    console.log(
      `${environment.NOTE_API_URL}` +
        "/" +
        noteId +
        `${environment.DELETE_NOTE_URL}`
    );
    return this._httpService
      .deleteMethod(
        `${environment.NOTE_API_URL}` +
          "/" +
          noteId +
          `${environment.DELETE_NOTE_URL}`,
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }

  public archiveNote(noteId: number) {
    console.log("service reached with id : " + noteId);
    console.log(
      `${environment.NOTE_API_URL}` +
        "/" +
        noteId +
        `${environment.ARCHIVE_NOTE_URL}`
    );
    return this._httpService
      .deleteMethod(
        `${environment.NOTE_API_URL}` +
          "/" +
          noteId +
          `${environment.ARCHIVE_NOTE_URL}`,
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }
  public deleteForeverNote(noteId: number) {
    console.log("service reached with id : " + noteId);
    console.log(
      `${environment.NOTE_API_URL}` +
        "/" +
        noteId +
        `${environment.DELETE_FOREVER_NOTE_URL}`
    );
    return this._httpService
      .deleteMethod(
        `${environment.NOTE_API_URL}` +
          "/" +
          noteId +
          `${environment.DELETE_FOREVER_NOTE_URL}`,
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }

  public restoreNote(noteId: number) {
    console.log("service reached with id : " + noteId);
    console.log(
      `${environment.NOTE_API_URL}` +
        "/" +
        noteId +
        `${environment.RESTORE_NOTE_URL}`
    );
    return this._httpService
      .putMethod(
        `${environment.NOTE_API_URL}` +
          "/" +
          noteId +
          `${environment.RESTORE_NOTE_URL}`,
        {},
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }

  public pinUnpinNote(noteId: number) {
    console.log("service reached with id : " + noteId);
    console.log(
      `${environment.NOTE_API_URL}` +
        "/" +
        noteId +
        `${environment.PINNED_UNPINNED_NOTE_URL}`
    );
    return this._httpService
      .patchMethod(
        `${environment.NOTE_API_URL}` +
          "/" +
          noteId +
          `${environment.PINNED_UNPINNED_NOTE_URL}`,
        {},
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }

  public changeColorOfNote(noteId: number, color: string) {
    console.log("service reached with id : " + noteId);
    console.log(
      `${environment.NOTE_API_URL}` +
        "/" +
        noteId +
        `${environment.CHANGE_COLOR_NOTE_URL}${color}`
    );
    return this._httpService
      .patchMethod(
        `${environment.NOTE_API_URL}` +
          "/" +
          noteId +
          `${environment.CHANGE_COLOR_NOTE_URL}${color}`,
        {},
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }

  public addRemainderToNote(noteId: number, time: string) {
    console.log("service reached with id : " + noteId);
    console.log(
      `${environment.NOTE_API_URL}` +
        "/" +
        noteId +
        `${environment.ADD_REMAINDER_URL}${time}`
    );
    return this._httpService
      .putMethod(
        `${environment.NOTE_API_URL}` +
          "/" +
          noteId +
          `${environment.ADD_REMAINDER_URL}${time}`,
        {},
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }

  public removeRemainder(noteId: number) {
    console.log("service reached with id : " + noteId);
    console.log(
      `${environment.NOTE_API_URL}` +
        "/" +
        noteId +
        `${environment.REMOVE_REMAINDER_URL}`
    );
    return this._httpService
      .deleteMethod(
        `${environment.NOTE_API_URL}` +
          "/" +
          noteId +
          `${environment.REMOVE_REMAINDER_URL}`,
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }
}
